"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifyCodeValidation } from "@/Schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const page = () => {
  const router = useRouter();
  const param = useParams<{ username: string }>();
  const form = useForm<z.infer<typeof verifyCodeValidation>>({
    resolver: zodResolver(verifyCodeValidation),
    defaultValues: {
      code: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof verifyCodeValidation>) => {
    try {
      const res = await axios.post("/api/verify-code", {
        username: param.username,
        code: data.code,
      });
      toast.success("code send succesfully");
      router.push("/sign-in");
    } catch (error) {
      console.log("error while sign up ", error);
      const AxiosError = error as AxiosError<ApiResponse>;
      let errorMessage = AxiosError.response?.data.message;
      toast.error(errorMessage);
    }
  };
  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center
      bg-gradient-to-b from-[#111]"
    >
      <div className="w-full max-w-sm mx-auto border border-[#8686865a] rounded-lg p-6 space-y-5 ">
        <div className="flex flex-col items-center justify-center space-y-2 mt-4 ">
          <h1 className="font-bold text-2xl text-center text-neutral-300 ">
            Verify your code
          </h1>
          <p className="text-sm tracking-wider">
            Enter your code to verify your account
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-1 py-5 flex flex-col justify-center"
          >
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="code"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                      }}
                      className=" focus:outline-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className=" self-start">
              Send code
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default page;
