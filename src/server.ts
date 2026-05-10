import Fastify from 'fastify';
import dotenv from 'dotenv';

dotenv.config();

const fastify = Fastify({ logger: true });

fastify.get('/health', async (request, reply) => {
  return reply.send({ status: 'ok', service: 'payment-service' });
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3005;
    await fastify.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();