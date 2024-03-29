require("dotenv").config({ path: "./.env.local"});

const connection = process.env.DB_NAME ? 
  {
    host: process.env.DB_HOST || "127.0.0.1",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  }
  : process.env.DB_URL;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgresql",
    connection: connection,
    migrations: {
      directory: "./db/migrations",
    },
    seeds:{
      directory: "./db/seeds",
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DB_URL,
    migrations: {
      directory: "./db/migrations",
    },
    seeds:{
      directory: "./db/seeds",
    }
  }
};
