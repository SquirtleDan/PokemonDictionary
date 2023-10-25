require("dotenv").config({ path: "./.env.local"});

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "postgresql",
    connection: process.env.DB_URL,
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      tableName: "d"
    }
  },

  

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    },
    seeds:{
      tableName: "d"
    }
  }

};
