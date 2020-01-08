import { Pool } from 'pg';
import dotenv from 'dotenv';
import 'idempotent-babel-polyfill';


dotenv.config();
class User {
  constructor() {
    this.pool = new Pool({
      connectionString: process.env.DATABASE_URL
    });
  this.pool.connect() 
  .then(()=> console.log('db connected'))
  .catch((e)=> console.log(e));   
  this.initialize();
  }
  createEmployeesTable = `CREATE TABLE IF NOT EXISTS
  employees(
    id SERIAL NOT NULL PRIMARY KEY,
    employee_name VARCHAR(128) NOT NULL,
    national_id  BIGINT,
    phone_number VARCHAR(128) NOT NULL,
    email VARCHAR(128) NOT NULL,
    date_of_birth DATE NOT NULL DEFAULT CURRENT_DATE,
    status VARCHAR(128) NOT NULL DEFAULT 'inactive',
    position VARCHAR(128) NOT NULL
  )`;
  async execute (sql, data = []) {
    const connection = await this.pool.connect() ;
    try {
      if (data.length) return await connection.query(sql, data);
      return await connection.query(sql);
    } catch (error) {
      return error;
    } finally {
      connection.release();
    }
  }
  async initialize() {
    await this.execute(this.createEmployeesTable);
  }
}
export default new User();