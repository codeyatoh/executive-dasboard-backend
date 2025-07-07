// src/services/external-orders/external-orders.class.js

export class ExternalOrdersService {
  constructor(options) {
    this.options = options || {};
  }

  async create(data) {
    const db = this.options.app.get('postgresqlClient');
    const [order] = await db('orders').insert(data).returning('*');
    return order;
  }

  async find(params) {
    const db = this.options.app.get('postgresqlClient');
    return db('orders').select('*');
  }
}
