"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Badge } from "@/components/ui/badge";
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Verified } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { data: session } = useSession();
  const user = session?.user;
  return (
    <div className="w-full min-h-20 ">
      <div className=" flex max-w-7xl mx-auto justify-between min-h-20 items-center p-5  border-b border-[#7777772d]">
        <div className="flex flex-col justify-center items-start gap-2">
          <a className="text-2xl font-bold text-green-400" href="/">
            Public Message
          </a>
          {user && (
            <Badge className="bg-blue-500 cursor-pointer" asChild>
              <p className="text-neutral-200">
                <Verified className="text-white"></Verified>
                <span className=" text-neutral-200">verified</span>
              </p>
            </Badge>
          )}
        </div>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="bg-blue-300 flex justify-center items-center p-3 cursor-pointer outline-none focus-visible:outline-non">
                <h3 className=" font-bold text-neutral-800">
                  {user?.username?.[0]?.toUpperCase()}
                </h3>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                {" "}
                <Button
                  variant={"ghost"}
                  className=" cursor-pointer"
                  onClick={() => signOut()}
                >
                  Signout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        {!user && (
          <Button
            variant={"secondary"}
            className=" cursor-pointer"
            onClick={() => signIn()}
          >
            SignIn
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
