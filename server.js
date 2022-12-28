const fastify = require('fastify')({logger: true});
const items = require('./items');


const PORT = 5001;

fastify.register(require('@fastify/swagger'));
fastify.register(require('@fastify/swagger-ui'), {
  exposeRoute: true,
  routePrefix: '/docs/api',
  swagger: {
    info: {
      title: 'Fastify api test',
    },
  }
});
fastify.register(require('./routes/item'));


const start = async () => {
  try {
    await fastify.listen({port: PORT});
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
