import { cookieSetter, generateToken } from "../../../libs/features";
import connectMongoDB from "../../../libs/mongodb";
import {asyncError, errorHandler} from "../../../middleware/error";
import {User} from "../../../models/user"
import bcrypt from "bcrypt"

const handler = asyncError(async (req,res) => {

    if (req.method !== "POST")
        return errorHandler(res, 400, "Only POST Method is allowed");

    const {name,email,password} = req.body;

    
    if(!name || !email || !password)
        return errorHandler(res,400,"Please Enter all fields")

      await connectMongoDB()  

    let user = await User.findOne({email});

    if(user) return errorHandler(res,400,"User already exits")

    const hashedPassword = await bcrypt.hash(password, 10);

    user = await User.create({
        name,
        email,
        password:hashedPassword,
    })

    let token = generateToken(user._id);

    cookieSetter(res,token,true);

    res.status(201).json({
        success:true,
        message:"Registered successfully",
        user,
    })

});

export default handler;