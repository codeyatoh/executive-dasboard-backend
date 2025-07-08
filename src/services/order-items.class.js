export class OrderItemsService {
  constructor(options) {
    this.options = options || {};
  }

  async create(data) {
    const db = this.options.app.get('postgresqlClient');
    const itemData = {
      order_id: data.order_id,
      item_name: data.item_name,
      quantity: data.quantity,
      price: data.price
    };
    await db('order_items').insert(itemData);
    return itemData;
  }

  async find(params) {
    const db = this.options.app.get('postgresqlClient');
    return db('order_items').select('*');
  }
} 