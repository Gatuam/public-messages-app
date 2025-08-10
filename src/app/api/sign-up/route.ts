import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import sendMail from "@/config/mail";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await req.json();
    const existingUser = await UserModel.findOne({
      email,
    });
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 1);

    if (existingUser) {
      if (existingUser.isVerify) {
        return Response.json(
          {
            success: false,
            message: "User already exist",
          },
          { status: 400 }
        );
      } else {
        existingUser.verifyCode = code;
        existingUser.verifyCodeExp = expiryDate;
        await existingUser.save();

        await sendMail(
          existingUser.email,
          `Hello, Dear${existingUser.username} here is your verification code `,
          code
        );
        if (!sendMail) {
          return Response.json(
            {
              success: false,
              message: "Email send error",
            },
            { status: 400 }
          );
        }
      }
      return Response.json(
        {
          success: true,
          message: "Verification email was send check your mail",
        },
        {
          status: 200,
        }
      );
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      username,
      email,
      password: hashPassword,
      verifyCode: code,
      isVerify: false,
      verifyCodeExp: expiryDate,
      isAccpectingMessage: true,
      message: [],
    });
    await newUser.save();
    await sendMail(
      newUser.email,
      `Hello, Dear ${newUser.username}, here is your verification code`,
      code
    );
    return Response.json(
      {
        success: true,
        message: "User registered. Verification email sent.",
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        success: false,
        message: "Error while registering user",
      },
      { status: 500 }
    );
  }
}
