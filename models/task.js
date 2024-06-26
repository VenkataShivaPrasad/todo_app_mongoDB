import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    title: {
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    user: {
        type: String,
        required:true,
        ref:"User"
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

mongoose.models = {}

export const Task = mongoose.model("Task", taskSchema)