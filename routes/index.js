const removeBG = require('../services/v1/removeBackground');

const postRemoveBGImage = {
  schema: {
    body: {
      type: 'string',
      required: ['image'],
      properties: {
        image: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          image: { type: 'string' },
          statusCode:{ type: 'number' },
          message:{ type: 'string' },
          error: { type: 'string' },
        }
      },
      400: {
        type: 'object',
        properties: {
          image: { type: 'string' },
          statusCode:{ type: 'number' },
          message:{ type: 'string' },
          error: { type: 'string' },
        }
      }
    }
  },

  handler: removeBG
}

const apiRoutes = (fastify, _options, done) => {
  // image routes
  fastify.post('/remove_image_background', postRemoveBGImage);
  done();
}

module.exports = apiRoutes;
