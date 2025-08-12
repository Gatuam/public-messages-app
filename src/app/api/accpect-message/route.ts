import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
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
  const userId = user._id;
  const { accpectMessagestatue } = await req.json();
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAccpectingMessage: accpectMessagestatue,
      },
      {
        new: true,
      }
    );
    if (!updateUser) {
      console.log("User not found");
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        message: "Message acceptance status successfully",
        updateUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log(`Server error while accepting message, ${error}`);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error while accepting message",
      }),
      { status: 500 }
    );
  }
}

export async function GET(_req: Request) {
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
  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      console.log("User not found");
      return new Response(
        JSON.stringify({
          success: false,
          message: "User not found",
        }),
        { status: 404 }
      );
    }
    return new Response(
      JSON.stringify({
        success: true,
        isAccpectingMessages: foundUser.isAccpectingMessage,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.log("Server error while checking message status");
    return new Response(
      JSON.stringify({
        success: false,
        message: "Server error while checking message status",
      }),
      { status: 500 }
    );
  }
}
