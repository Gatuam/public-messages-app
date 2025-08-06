import dbConnect from "@/config/dbconfig";
import UserModel, { MessageSchema, Message } from "@/models/User";
import { success } from "zod";

export async function POST(req : Request) {
    await dbConnect()

    const { username, content } = await req.json();
    try {
        const user = await UserModel.findOne({
            username
        });
        if(!user){
            return Response.json({
                success : false,
                message: "User not found"
            },{status : 404});
        }
        if(!user.isAccpectingMessage){
            return Response.json({
                success : false,
                message: "User is not accpecting messages"
            },{status : 403});
        }
        const newMessage = {
            content, createAt : new Date()
        }
        user.message.push(newMessage as Message)
        await user.save()
         return Response.json({
                success : true,
                message: "Message send succefully"
            },{status : 200});
    } catch (error) {
         return Response.json({
                success : false,
                message: "server error while sending message"
            },{status : 500});
    }
}