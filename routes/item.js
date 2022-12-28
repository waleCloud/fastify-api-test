const {
  getItems, getItem, 
  addItem, deleteItem,
  updateItem,
} = require('../controllers/itemController');

const ItemSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  }
}
// Options for get all items from routes
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: ItemSchema
      }
    }
  },
  handler: getItems
}

// Options for get single item from routes
const getItemSingleOpts = {
  schema: {
    response: {
      200: ItemSchema
    }
  },

  handler: getItem
}

// Options for add item to routes
const addItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ['name'],
      properties: {
        name: { type: "string" }
      }
    },
    response: {
      201: ItemSchema
    }
  },

  handler: addItem
}

// Options for delete item route
const deleteItemOpts = {
  schema: {
    response: {
      201: ItemSchema
    }
  },

  handler: deleteItem
}

// Options for add item to routes
const updateItemOpts = {
  schema: {
    body: {
      type: "object",
      required: ['name'],
      properties: {
        name: { type: "string" }
      }
    },
    response: {
      201: ItemSchema
    }
  },

  handler: updateItem
}

const itemsRoute = (fastify, options, done) => {

  fastify.get('/items', getItemsOpts);
  fastify.get('/item/:id', getItemSingleOpts);
  fastify.post('/item', addItemOpts);
  fastify.delete('/item/:id', deleteItemOpts);
  fastify.put('/item/:id', updateItemOpts);

  done();
}

module.exports = itemsRoute;
