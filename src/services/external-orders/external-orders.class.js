export class ExternalOrdersService {
    constructor(options) {
      this.options = options || {};
    }
  
    async create(data) {
      // Save order to PostgreSQL using Knex
      const db = this.options.app.get('postgresqlClient');
      const [order] = await db('orders').insert(data).returning('*');
      return order;
    }
  
    async find(params) {
      const db = this.options.app.get('postgresqlClient');
      return db('orders').select('*');
    }
  }