import {asyncError, errorHandler} from "../../middleware/error"
import connectMongoDB from "../../libs/mongodb";
import { Task } from "../../models/task";
import { checkAuth } from "../../libs/features";

const handler = asyncError(async(req, res) => {
    if (req.method !== "POST")
        return errorHandler(res, 400, "Only POST Method is allowed");
    await connectMongoDB();

    const { title, description } = req.body;

    if (!title || !description)
     return errorHandler(res,400,"Please Enter all fields")

    const user = await checkAuth(req);

    if (!user) return errorHandler(res, 401, "Login First");

    await Task.create({
        title,
        description,
        user:user._id,
    });

    res.json({
        success: true,
        message: "Task Created",
      });
});


export default handler;