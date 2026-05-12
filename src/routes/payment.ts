import { FastifyInstance } from 'fastify';
import Stripe from 'stripe';
import { sendPaymentSuccessEvent } from '../kafka/kafka';
import { verifySecret } from '../hooks/auth';
import { CheckoutRequest } from "../types";
import { CREDIT_PACKAGES } from "../config/pricing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-04-22.dahlia',
});

export default async function paymentRoutes(fastify: FastifyInstance) {

  fastify.addContentTypeParser('application/json', { parseAs: 'buffer' }, (req, body, done) => {
    try {
      if (req.url.includes('/webhook')) {
        done(null, body);
      } else {
        done(null, JSON.parse(body.toString()));
      }
    } catch (err: any) {
      err.statusCode = 400;
      done(err, undefined);
    }
  });

  fastify.post<CheckoutRequest>('/checkout', {preHandler: [verifySecret]}, async (request, reply) => {
    try {
      const userId = request.headers['x-user-id'] as string;
      const { packageId } = request.body;

      if (!userId) {
        return reply.status(400).send({ error: 'userId is required' });
      }

      if (!packageId || !CREDIT_PACKAGES[packageId]) {
        return reply.status(400).send({ error: 'Invalid or missing packageId' });
      }

      const selectedPackage = CREDIT_PACKAGES[packageId];

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
          {
            price: selectedPackage.priceId,
            quantity: 1,
          },
        ],
        success_url: `${process.env.FRONTEND_URL}/pricing/success`,
        cancel_url: `${process.env.FRONTEND_URL}/pricing/cancel`,
        metadata: {
          userId,
          creditsToAdd: selectedPackage.creditsToAdd.toString(),
        },
      });

      return reply.send({ checkoutUrl: session.url });
    } catch (error: any) {
      fastify.log.error(error);
      return reply.status(500).send({ error: error.message });
    }
  });

  fastify.post('/webhook', async (request, reply) => {
    const sig = request.headers['stripe-signature'];

    if (!sig) {
      return reply.status(400).send('Missing stripe signature');
    }

    let event;

    try {
      const rawBody = request.body as Buffer;

      event = stripe.webhooks.constructEvent(
        rawBody,
        sig as string,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      fastify.log.error(`Webhook signature failed: ${err.message}`);
      return reply.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as any;

      const userId = session.metadata?.userId;
      const creditsToAdd = Number(session.metadata?.creditsToAdd);
      const amountPaid = session.amount_total;

      if (userId && creditsToAdd && amountPaid) {
        await sendPaymentSuccessEvent({
          userId,
          creditsToAdd,
          amountPaid,
          stripeSessionId: session.id,
        });
      }
    }

    return reply.send({ received: true });
  });
}