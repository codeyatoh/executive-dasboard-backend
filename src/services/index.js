import { ExternalOrdersService } from './external-orders/external-orders.class.js';
import { CrewService } from './crew.class.js';
import { OrderItemsService } from './order-items.class.js';

export const services = app => {
  app.use('/external-orders', new ExternalOrdersService({ app }));
  app.use('/crew', new CrewService({ app }));
  app.use('/order-items', new OrderItemsService({ app }));
}; 