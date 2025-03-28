import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("users",(table)=>{
        table.increments("id").primary();
        table.string("username").notNullable().unique();
        table.string("password").notNullable();
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("users")
}

