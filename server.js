const fastify = require('fastify')({logger: true});

const PORT = 5001;

fastify.register(require('@fastify/multipart'));
fastify.register(require('@fastify/swagger'));
fastify.register(require('@fastify/swagger-ui'), {
  exposeRoute: true,
  routePrefix: '/api/docs',
  swagger: {
    info: {
      title: 'Fastify api test',
    },
  }
});
fastify.register(require('./routes'), {
  prefix: '/api/v1/'
});
fastify.register(require('@fastify/env'), {
  dotenv: {
    path: `${__dirname}/.env`,
    debug: true
  },
  schema: {}
});


const start = async () => {
  try {
    await fastify.listen({port: PORT});
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
}

start();
