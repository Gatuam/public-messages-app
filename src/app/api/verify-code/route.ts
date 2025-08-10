import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { code, username } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({
      username: decodedUsername,
    });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExp = new Date(user.verifyCodeExp) > new Date();
    if (isCodeValid && isCodeNotExp) {
      user.isVerify = true;
      await user.save();

      return Response.json(
        {
          success: true,
          message: "Account is vrified",
        },
        { status: 200 }
      );
    } else if (!isCodeValid) {
      console.log("Code is not corrrect");
      return Response.json(
        {
          success: false,
          message: "Code is not correct",
        },
        { status: 400 }
      );
    } else {
      console.log("Code is expired");
      return Response.json(
        {
          success: false,
          message: "Code is not expired",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    return Response.json({
      success: false,
      message: error,
    });
  }
}
