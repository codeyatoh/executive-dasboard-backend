// src/services/external-orders/external-orders.class.js

export class ExternalOrdersService {
  constructor(options) {
    this.options = options || {};
  }

  async create(data) {
    console.log('Received order payload:', data);
    const db = this.options.app.get('postgresqlClient');
    // Convert status to boolean
    let statusValue = data.status;
    if (typeof statusValue === 'string') {
      if (statusValue.toLowerCase() === 'active') statusValue = true;
      else if (statusValue.toLowerCase() === 'inactive') statusValue = false;
      else statusValue = !!statusValue;
    }
    // Insert crew if crew_id is present and not already in the table
    if (data.crew_id) {
      try {
        const crew = await db('crew').where({ crew_id: data.crew_id }).first();
        if (!crew) {
          await db('crew').insert({
            crew_id: data.crew_id,
            first_name: data.first_name || data.firstName || '',
            last_name: data.last_name || data.lastName || '',
            email: data.email || '',
            gender: data.gender || '',
            status: statusValue !== undefined ? statusValue : true,
            hire_date: data.hire_date || new Date()
          });
        }
      } catch (err) {
        console.error('Crew insert error:', err);
      }
    }
    // 2. Order
    const orderData = {
      order_id: data.order_id,
      crew_id: data.crew_id,
      total_price: data.total_price,
      order_status: data.order_status,
      created_at: data.created_at ? new Date(data.created_at) : new Date()
    };
    let order;
    try {
      [order] = await db('orders').insert(orderData).returning('*');
    } catch (err) {
      console.error('Order insert error:', err);
      throw err;
    }
    // 3. Order Items
    let insertedItems = [];
    const itemsArray = data.items || data.order_items || [];
    if (Array.isArray(itemsArray) && itemsArray.length > 0) {
      for (const item of itemsArray) {
        try {
          const [insertedItem] = await db('order_items')
            .insert({
              order_id: data.order_id,
              item_name: item.item_name || item.itemName || '',
              quantity: item.quantity || 1,
              price: item.price || 0
            })
            .returning('*');
          insertedItems.push(insertedItem);
        } catch (err) {
          console.error('Order item insert error:', err);
        }
      }
    }
    // Return the full order with items
    return {
      ...order,
      items: insertedItems
    };
  }

  async find(params) {
    const db = this.options.app.get('postgresqlClient');
    return db('orders').select('*');
  }
}
