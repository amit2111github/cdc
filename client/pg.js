const { Pool } = require("pg");
const {
  POSTGRES_HOST,
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
} = require("../env");


const pool = new Pool({
  host: POSTGRES_HOST,
  database: POSTGRES_DATABASE,
  port: POSTGRES_PORT,
  password: POSTGRES_PASSWORD,
  user: POSTGRES_USER,
});

module.exports = { pool };
