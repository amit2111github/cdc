const { configDotenv } = require("dotenv");

configDotenv();

const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE;
const POSTGRES_PORT = process.env.POSTGRES_PORT;
const POSTGRES_HOST = process.env.POSTGRES_HOST;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const POSTGRES_USER = process.env.POSTGRES_USER;

module.exports = {
  POSTGRES_DATABASE,
  POSTGRES_PORT,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_USER,
};
