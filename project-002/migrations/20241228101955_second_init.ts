import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable("courses",(table)=>{
        table.increments("id").primary();
        table.string("link").notNullable();
        table.text("description").notNullable();
        table.text("title").notNullable();
        table.string("source").notNullable();
        table.specificType("tags","text[]");
        }).createTable("courseFavourites",(table)=>{
            table.increments("id").primary();
            table.integer("user_id").references("users.id").notNullable();
            table.integer("course_id").references("courses.id").notNullable();
        })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("courseFavourites").dropTableIfExists("courses")
}

