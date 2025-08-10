import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/config/dbconfig";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        await dbConnect();
        try {
          const user = await UserModel.findOne({
            email: credentials?.email,
          });
          if (!user) {
            throw new Error("No user found with this email");
          }
          if (!user.isVerify) {
            throw new Error("You are not verify, verify to login");
          }
          const decodePassword = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (decodePassword) {
            return user;
          } else {
            throw new Error("Password is incorrect");
          }
        } catch (error) {
          return Response.json({
            success: false,
            message: "Eoor acccour while sign-in",
          });
          throw new Error("An error occurred during login");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id?.toString();
        token.username = user.username;
        token.isVerify = user.isVerify;
        token.isAccpectMessages = user.isAccpectMessages;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          _id: token._id,
          isAccpectMessages: token.isAccpectMessages,
          isVerify: token.isVerify,
          username: token.username,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
