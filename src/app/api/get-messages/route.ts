import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";

export async function POST(_req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "User is not authorized",
      }),
      { status: 401 }
    );
  }
  const userId = new mongoose.Types.ObjectId(user._id);
  try {
    const userData = await UserModel.aggregate([
      { $match: { _id: userId } },
      { $unwind: "$messages" },
      { $sort: { "messages.createdAt": -1 } },
      { $group: { _id: "$_id", messages: { $push: "$messages" } } },
    ]);
    if (!userData || userData.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 400 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        messages: userData[0].messages,
      }),
      { status: 200 }
    );
  } catch (_error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error while getting messages",
      }),
      { status: 500 }
    );
  }
}
