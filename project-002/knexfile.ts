import type { Knex } from "knex";
import "dotenv/config"

const{DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_DATABASE}=process.env


const config: { [key: string]: Knex.Config } = {
  development: {
    client:"postgresql",
    connection:{
        host:DB_HOST,
        port:Number(DB_PORT),
        user:DB_USER,
        password:DB_PASSWORD,
        database:DB_DATABASE
    },
    pool:{
        min:2,
        max:10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }

};

module.exports = config;
