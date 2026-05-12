import Fastify from 'fastify';
import dotenv from 'dotenv';
import { connectKafka } from "./kafka/kafka";
import paymentRoutes from "./routes/payment";

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.register(paymentRoutes, { prefix: '/payments' });

fastify.get('/health', async (_request, reply) => {
  return reply.send({ status: 'ok', service: 'payment-service' });
});

const start = async () => {
  try {
    await connectKafka();
    const port = Number(process.env.PORT) || 3005;
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

void start();