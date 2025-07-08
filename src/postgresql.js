// For more information about this file see https://dove.feathersjs.com/guides/cli/databases.html
import knex from 'knex'
import dotenv from 'dotenv'
dotenv.config()

export const postgresql = app => {
  // Prefer environment variables if set, otherwise use app config
  const config = process.env.DB_HOST && process.env.DB_USER && process.env.DB_PASS && process.env.DB_NAME
    ? {
        client: 'pg',
        connection: {
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME
        }
      }
    : app.get('postgresql');
  const db = knex(config)
  app.set('postgresqlClient', db)
}
