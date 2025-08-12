import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const { code, username } = await req.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });
    if (!user) {
      return new Response(
        JSON.stringify({ success: false, message: "User not found" }),
        { status: 400 }
      );
    }
    const isCodeValid = user.verifyCode === code;
    const isCodeNotExp = new Date(user.verifyCodeExp) > new Date();
    if (isCodeValid && isCodeNotExp) {
      user.isVerify = true;
      await user.save();

      return new Response(
        JSON.stringify({ success: true, message: "Account is verified" }),
        { status: 200 }
      );
    } else if (!isCodeValid) {
      console.log("Code is not correct");
      return new Response(
        JSON.stringify({ success: false, message: "Code is not correct" }),
        { status: 400 }
      );
    } else {
      console.log("Code is expired");
      return new Response(
        JSON.stringify({ success: false, message: "Code is expired" }),
        { status: 400 }
      );
    }
  } catch (error: any) {
    return new Response(
      JSON.stringify({ success: false, message: error.message || error }),
      { status: 500 }
    );
  }
}
