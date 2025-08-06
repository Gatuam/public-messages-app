import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function POST(req: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return Response.json(
      {
        success: true,
        message: "User is not authorized",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  const { willAccpectMessage } = await req.json();
  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      userId,
      {
        isAccpectingMessage: willAccpectMessage,
      },
      {
        new: true,
      }
    );
    if (!updateUser) {
      console.log("User not found");
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        message: "Message accpectance status succefully",
        updateUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Server error while accpecting message");
    return Response.json(
      {
        success: false,
        message: "Server error while accpecting message",
      },
      { status: 500 }
    );
  }
}

export async function Get(req : Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user = session?.user;
  if (!session || !user) {
    return Response.json(
      {
        success: true,
        message: "User is not authorized",
      },
      { status: 401 }
    );
  }
  const userId = user._id;
  try {
    const foundUser = await UserModel.findOne({
        userId
    });
     if (!foundUser) {
      console.log("User not found");
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        success: true,
        isAccpectingMessages : foundUser.isAccpectingMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Server error while checking message status");
    return Response.json(
      {
        success: false,
        message: "Server error while checking message status",
      },
      { status: 500 }
    );
  }
}
