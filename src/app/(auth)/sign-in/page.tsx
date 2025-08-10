"use client";
import React, { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signInValidation } from "@/Schemas/SignInSchema";
import { signIn } from "next-auth/react";

const page = () => {
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signInValidation>>({
    resolver: zodResolver(signInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signInValidation>) => {
    console.log(data);
    setSubmit(true);
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    router.push('/dashboard')
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success("Sign-in successfully");
    }
  };

  return (
    <div className="w-full min-h-screen  flex flex-col justify-center items-center bg-gradient-to-b from-[#111]">
      <div className="w-full max-w-sm mx-auto border border-[#8686865a] rounded-lg p-6 space-y-6 ">
        <div className="flex flex-col items-center justify-center space-y-2 mt-4 ">
          <h1 className="font-bold text-2xl text-center text-neutral-300 ">
            Join Public Messaging App
          </h1>
          <p className="text-sm tracking-wider">Sign In to Start</p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-1 py-5 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="email"
                      {...field}
                      className=" focus:outline-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                      className=" focus:outline-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={submit} type="submit" className=" self-center">
              {submit ? (
                <>
                  <Loader2 className=" animate-spin" />
                </>
              ) : (
                "Signup"
              )}
            </Button>
            <div>
              <h4>
                Dont Have account yet?
                <span className="ml-2">
                  {" "}
                  <Link
                    className="text-sm tracking-tight text-blue-400 "
                    href="/sign-up"
                  >
                    Sign-up
                  </Link>
                </span>
              </h4>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
