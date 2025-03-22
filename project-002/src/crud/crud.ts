import knex from "../config/knex"

export const createUser= async (body:{username:string,password:string})=>{
    const user=await knex("users").where("username","=",body.username).first()
    if(user){
     return(400)
    }
    const author=await knex("users").insert(body)
    return 200
}

export const allUsers=async ()=>{
    const users=await knex("users").select("*")
    console.log(users)
}

export const getUserByUsername=async (User:string)=>{
    const user=await knex("users").select("*").where("username",'=',User)
    return user
}

export const getPasswordByUsername=async (User:string)=>{
    const user=await knex("users").select("password").where("username",'=',User).first()
    return user
}

export const getCourses=async ()=>{
    const courses=await knex("courses").select("*").limit(6)
    return courses
}

export const getId=async(username:string)=>{
    const id=await knex("users").select("id").where("username","=",username).first()
    return id.id
}

export const addFav=async(u_id:number,c_id:number)=>{
const isvalid=await knex("courseFavourites").where({"user_id":u_id,"course_id":c_id}).select("*")
if(isvalid.length==0){
    const added=await knex("courseFavourites").insert({user_id:u_id,course_id:c_id})
    return true
}
else{
    return false
}
}

export const getFavs=async(u_id:number)=>{
    const faved=await knex("courseFavourites").join("courses","courseFavourites.course_id","=","courses.id")
    .select("courses.title","courses.link","courses.id").where("courseFavourites.user_id","=",u_id)
    return faved
}

export const removeFav = async (u_id: number, c_id: number) => {
    try {
      const deleted = await knex("courseFavourites")
        .where({
          "user_id": u_id,
          "course_id": c_id
        })
        .del();
      
      // If any rows were affected (deleted), return true
      return deleted > 0;
    } catch (error) {
      console.error("Error removing favorite:", error);
      return false;
    }
  }