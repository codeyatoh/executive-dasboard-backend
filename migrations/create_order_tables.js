// orders table
export async function up(knex) {
    await knex.schema.createTable('orders', (table) => {
      table.string('order_id').primary()
      table.string('crew_id')
      table.decimal('total_price', 10, 2)
      table.string('order_status')
      table.timestamp('created_at').defaultTo(knex.fn.now())
    })
  
    // order_items table
    await knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary()
      table.string('order_id').references('order_id').inTable('orders').onDelete('CASCADE')
      table.string('item_name')
      table.integer('quantity')
      table.decimal('price', 10, 2)
    })
  }
  
  export async function down(knex) {
    // Drop order_items first, then orders
    await knex.schema.hasTable('order_items').then(async (exists) => {
      if (exists) await knex.schema.dropTable('order_items');
    });
    await knex.schema.hasTable('orders').then(async (exists) => {
      if (exists) await knex.schema.dropTable('orders');
    });
  }