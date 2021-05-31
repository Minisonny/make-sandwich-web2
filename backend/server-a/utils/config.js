require("dotenv").config();

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;
const RABBIT_HOST = process.env.RABBIT_HOST;
const PREPARE_QUEUE_NAME = process.env.PREPARE_QUEUE_NAME;
const DONE_QUEUE_NAME = process.env.DONE_QUEUE_NAME;

module.exports = {
  DB_URL,
  PORT,
  RABBIT_HOST,
  PREPARE_QUEUE_NAME,
  DONE_QUEUE_NAME
};
