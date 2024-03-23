import mongoose, {Schema} from "mongoose";

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        select:false,
        minLength:[6,"Password too Short"]
    },
});

mongoose.models = {};

export const User = mongoose.model("User", UserSchema)