import { serialize } from "cookie"
import jwt from "jsonwebtoken"
import {User} from "../models/user"
import { log } from "console"

export const cookieSetter = (res,token, set) => {
 
    // let token;
    res.setHeader("Set-Cookie",
     serialize("token",set ? token : "",{
        path:"/",
        httpOnly:true,
        maxAge:set? 60*60*1000:0,
    }))

}


export const generateToken = (_id)=> {
    return jwt.sign({_id},process.env.JWT_SECRET);
}


export const checkAuth = async (req,res) => {
 
   
    const cookie = req.headers.cookie;

    if (!cookie) return null;
  
    const token = req.headers.cookie.split("token=")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return await User.findById(decoded._id)
    
}