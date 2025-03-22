export interface  Users{
    id:number;
    username:string;
    password:string;
}

export interface Courses{
    id:number;
    link:string;
    description:string;
    title:string;
    source:string;
    tags:string[];
}

export interface courseFavourites{
    id:number;
    user_id:number;
    course_id:number;
}

declare module "knex/types/tables"{
    interface Tables{
        users:Users;
        courses:Courses;
        courseFavourites:courseFavourites;
    }
}

export interface JwtPayload {
    userId: string;
    iat: number;
}