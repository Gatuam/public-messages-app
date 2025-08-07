import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";
import { usernameValidation } from "@/Schemas/SignUpSchema";
import { z } from "zod";
import { NextResponse } from "next/server";

const usernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(req: Request) {
  await dbConnect();

  try {
    const searchParams = new URL(req.url).searchParams;

    const queryParam = {
      username: searchParams.get("username") ?? "",
    };

    const result = usernameQuerySchema.safeParse(queryParam);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return NextResponse.json(
        {
          success: false,
          message: "Error username checking",
          errors: usernameErrors,
        },
        { status: 400 }
      );
    }

    const { username } = result.data;

    const existVerifyUser = await UserModel.findOne({
      username,
      isVerify: true,
    });

    if (existVerifyUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Username is not unique",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Username is unique",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("error while checking username", error);
    return NextResponse.json(
      {
        success: false,
        message: "error checking username",
      },
      { status: 500 }
    );
  }
}
