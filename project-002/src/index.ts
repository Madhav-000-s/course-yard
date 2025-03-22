import express, { Request, Response } from 'express';
import { addFav, createUser, getCourses, getFavs, getId, getPasswordByUsername, getUserByUsername ,removeFav} from './crud/crud';
import * as argon2 from 'argon2'
import cors from 'cors'
import * as jwt from 'jsonwebtoken'
import { JwtPayload } from './types/type';
import knex from 'knex';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors())

app.post("/register",async (req:Request,res:Response)=>{
  try{
    const Username=req.body.username;
    const Password=req.body.password;
    if(!Username || !Password ){
      res.status(400).send("invalid")
    }
    const hashedPassword=await argon2.hash(Password)
    const status=await createUser({username:Username,password:hashedPassword})
    res.status(status).send(`status is ${status}`)
  }
  catch(e){
    console.error(e)
    res.status(500).send("failure")
  }
})

app.post("/login",async (req:Request,res:Response)=>{
  try{
    const Username=req.body.username
    const Password=req.body.password
    const hashedPassword=await getPasswordByUsername(Username)
    if(!hashedPassword){
      res.sendStatus(400)
    }
    else{
      const isValid=await argon2.verify(hashedPassword.password,Password)
      if(isValid){
        const id=await getId(Username)
        const token=jwt.sign({userId:id,username:Username},"secret")
        res.status(200).json({user_id:id,token:token,})
      }
      else{
        res.sendStatus(400)
      }
    }
  }
  catch(e){
    console.error(e)
    res.sendStatus(400)
  }
})

app.listen(port, () => {
  console.log(`Server is running ${port}`);
});

app.get("/dashboard",async (req:Request,res:Response)=>{
  try{
    const courses=await getCourses()
    res.send(courses).status(200)
  }
  catch(e){
    console.error(e)
    res.sendStatus(400)
  }
})


app.post("/protected",async (req:Request,res:Response)=>{
    try{
      const token=req.body.token
      const payload=jwt.verify(token,"secret") as JwtPayload
      if(payload){
        res.send(payload).status(200)
      }
      else{
        res.sendStatus(400)
      }
    }
    catch(e){
      console.error(e)
      res.sendStatus(500)
    }

})


app.post("/addFav",async (req:Request,res:Response)=>{
  try{
      const u_id=req.body.u_id
      const c_id=req.body.c_id
  
    const isvalid=await addFav(u_id,c_id)
    console.log(isvalid)
    if(isvalid){
      res.send(200)
    }
    else{
      res.sendStatus(201)
    }

  }
  catch(e){
    console.error(e)
    res.sendStatus(500)
  }
})

const main=async()=>{
   
}

app.post("/favourites",async(req:Request,res:Response)=>{
  try{
    const user_id=req.body.u_id
    const faved=await getFavs(user_id)
    res.send(faved).status(200)
  }
  catch(e){
    console.error(e)
  }
})

app.post("/removeFav", async (req: Request, res: Response) => {
  try {
    const u_id = req.body.u_id;
    const c_id = req.body.c_id;
    
    const isRemoved = await removeFav(u_id, c_id);
    console.log("Favorite removed:", isRemoved);
    
    if (isRemoved) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404); 
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500); 
  }
});