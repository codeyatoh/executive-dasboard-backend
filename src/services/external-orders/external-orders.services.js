// src/services/external-orders/external-orders.service.js

const { ExternalOrders } = require('./external-orders.class');
const createModel = require('../../models/external-orders.model');
const hooks = require('./external-orders.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Register the service on the Feathers app
  app.use('/external-orders', new ExternalOrders(options, app));

  // Get the initialized service to register hooks
  const service = app.service('external-orders');
  service.hooks(hooks);
};