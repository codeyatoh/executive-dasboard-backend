export async function up(knex) {
    // 1. crew table
    await knex.schema.createTable('crew', (table) => {
      table.string('crew_id').primary();
      table.string('first_name');
      table.string('last_name');
      table.string('email');
      table.string('gender');
      table.boolean('status');
      table.timestamp('hire_date').comment('Date and time the crew was hired');
    });
  
    // 2. orders table (may foreign key sa crew)
    await knex.schema.createTable('orders', (table) => {
      table.string('order_id').primary();
      table.string('crew_id').references('crew_id').inTable('crew').onDelete('SET NULL');
      table.decimal('total_price', 10, 2);
      table.string('order_status');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    });
  
    // 3. order_items table
    await knex.schema.createTable('order_items', (table) => {
      table.increments('id').primary();
      table.string('order_id').references('order_id').inTable('orders').onDelete('CASCADE');
      table.string('item_name');
      table.integer('quantity');
      table.decimal('price', 10, 2);
    });
  }
  
  export async function down(knex) {
    // Drop order_items first, then orders, then crew
    await knex.schema.hasTable('order_items').then(async (exists) => {
      if (exists) await knex.schema.dropTable('order_items');
    });
    await knex.schema.hasTable('orders').then(async (exists) => {
      if (exists) await knex.schema.dropTable('orders');
    });
    await knex.schema.hasTable('crew').then(async (exists) => {
      if (exists) await knex.schema.dropTable('crew');
    });
  }