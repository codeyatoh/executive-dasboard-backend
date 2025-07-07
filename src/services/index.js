import { ExternalOrdersService } from './external-orders/external-orders.class.js';

export const services = app => {
  app.use('/external-orders', new ExternalOrdersService({ app }));
}; 