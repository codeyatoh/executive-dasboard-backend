export const externalOrdersSchema = {
    type: 'object',
    required: ['order_id', 'crew_id', 'Total_items', 'total_price', 'order_status', 'created_at'],
    properties: {
      order_id: { type: 'string' },
      crew_id: { type: 'string' },
      Total_items: { type: 'string' },
      total_price: { type: 'number' },
      order_status: { type: 'string' },
      created_at: { type: 'string', format: 'date-time' }
    }
  };