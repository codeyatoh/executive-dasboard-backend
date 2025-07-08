export class CrewService {
  constructor(options) {
    this.options = options || {};
  }

  async create(data) {
    const db = this.options.app.get('postgresqlClient');
    const crewData = {
      crew_id: data.crew_id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      gender: data.gender,
      status: data.status,
      hire_date: data.hire_date
    };
    await db('crew').insert(crewData);
    return crewData;
  }

  async find(params) {
    const db = this.options.app.get('postgresqlClient');
    return db('crew').select('*');
  }
} 