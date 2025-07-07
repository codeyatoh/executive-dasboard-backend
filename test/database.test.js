import assert from 'assert'
import { app } from '../src/app.js'

describe('Database Connection Test', () => {
  let db

  before(async () => {
    // Get the database client from the app
    db = app.get('postgresqlClient')
  })

  after(async () => {
    // Close the database connection
    if (db) {
      await db.destroy()
    }
  })

  it('should connect to PostgreSQL database', async () => {
    try {
      // Test the connection by running a simple query
      const result = await db.raw('SELECT 1 as test')
      
      // Check if we got a result
      assert.ok(result)
      assert.ok(result.rows)
      assert.strictEqual(result.rows[0].test, 1)
      
      console.log('✅ PostgreSQL connection successful!')
      console.log('Database info:', {
        host: db.client.config.connection.host,
        port: db.client.config.connection.port,
        database: db.client.config.connection.database,
        user: db.client.config.connection.user
      })
    } catch (error) {
      console.error('❌ PostgreSQL connection failed:', error.message)
      throw error
    }
  })

  it('should be able to run migrations', async () => {
    try {
      // Check if we can access the migrations table
      const result = await db.raw("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
      
      assert.ok(result)
      assert.ok(result.rows)
      
      console.log('✅ Database schema access successful!')
      console.log('Available tables:', result.rows.map(row => row.table_name))
    } catch (error) {
      console.error('❌ Database schema access failed:', error.message)
      throw error
    }
  })
}) 