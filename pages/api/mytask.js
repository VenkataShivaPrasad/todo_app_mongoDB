import {asyncError, errorHandler} from "../../middleware/error"
import connectMongoDB from "../../libs/mongodb";
import { Task } from "../../models/task";
import { checkAuth } from "../../libs/features";

const handler = asyncError(async(req, res) => {
    if (req.method !== "GET")
        return errorHandler(res, 400, "Only GET Method is allowed");
    
    await connectMongoDB();

    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Login First");

    const tasks = await Task.find({user:user._id});

    res.json({
        success: true,
        tasks,
      });
});


export default handler;