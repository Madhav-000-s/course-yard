import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("courses").del();

    // Inserts seed entries
    await knex("courses").insert([
        {link:"",description:"react tutorial",title:"React",source:"",tags:["React"]},
        {link:"",description:"java tutorial",title:"java",source:"",tags:["java"]},
        {link:"",description:"react tutorial",title:"React",source:"",tags:["React"]},
        {link:"",description:"java tutorial",title:"java",source:"",tags:["java"]},
        {link:"",description:"react tutorial",title:"React",source:"",tags:["React"]},
        {link:"",description:"java tutorial",title:"java",source:"",tags:["java"]},
    ]);
};
