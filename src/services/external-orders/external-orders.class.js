// src/services/external-orders/external-orders.class.js

export class ExternalOrdersService {
  constructor(options) {
    this.options = options || {};
  }

  async create(data) {
    const db = this.options.app.get('postgresqlClient');
    // 1. Crew
    const crew = await db('crew').where({ crew_id: data.crew_id }).first();
    if (!crew) {
      await db('crew').insert({
        crew_id: data.crew_id,
        first_name: data.firstName || 'Unknown',
        last_name: data.lastName || '',
        email: data.email || '',
        gender: data.gender || '',
        status: true,
        hire_date: new Date()
      });
    }
    // 2. Order
    const orderData = {
      order_id: data.order_id,
      crew_id: data.crew_id,
      total_price: data.total_price,
      order_status: data.order_status,
      created_at: data.created_at ? new Date(data.created_at) : new Date()
    };
    const [order] = await db('orders').insert(orderData).returning('*');

    // 3. Order Items
    if (Array.isArray(data.items)) {
      for (const item of data.items) {
        await db('order_items').insert({
          order_id: data.order_id,
          item_name: item.item_name,
          quantity: item.quantity,
          price: item.price
        });
      }
    }

    return order;
  }

  async find(params) {
    const db = this.options.app.get('postgresqlClient');
    return db('orders').select('*');
  }
}
