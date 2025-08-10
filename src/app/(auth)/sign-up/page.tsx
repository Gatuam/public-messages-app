"use client";
import React, {  useState } from "react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import { signUpValidation } from "@/Schemas/SignUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const Page = () => {
  const [username, setUsername] = useState("");
  const [submit, setSubmit] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpValidation>) => {
    console.log(data)
    setSubmit(true)
    try {
      const res = await axios.post<ApiResponse>('/api/sign-up', data);
      if(!res.data.success){
        toast.error("Something went wrong. Please try again.")
        return
      }
      toast.success(res.data.message)
      router.push(`/verify/${username}`)

    } catch (error) {
      console.log("error while sign up ",error)
      const AxiosError = error as AxiosError<ApiResponse>;
      let errorMessage = AxiosError.response?.data.message
      toast.error(errorMessage)
    }finally{
      setSubmit(false)
    }
  };

  return (
    <div className="w-full pt-40  flex flex-col justify-center items-center bg-gradient-to-b from-[#111]">
      <div className="w-full max-w-sm mx-auto border border-[#8686865a] rounded-lg p-6 space-y-6 ">
        <div className="flex flex-col items-center justify-center space-y-2 mt-4 ">
          <h1 className="font-bold text-2xl text-center text-neutral-300 ">
            Join Public Messaging App
          </h1>
          <p className="text-sm tracking-wider">
            Sign up to start messaging
          </p>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 px-1 py-5 flex flex-col justify-center">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username"
                 {...field}
                 onChange={(e)=>{
                  field.onChange(e)
                  setUsername(e.target.value)
                 }}
                className=" focus:outline-0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="email"
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
        <Button 
        disabled={submit}
        type="submit"
        className=" self-center"
        >{
          submit ? (
            <>
            <Loader2 className=" animate-spin"/>
            </>
          ) : (
            'Signup'
          )
        }</Button>
        <div>
          <h4 >
            Already have an account?
            <span className="ml-2"> <Link className="text-sm tracking-tight text-blue-400 " href='/sign-in'>Sign-in</Link></span>
          </h4>
        </div>
        </form> 
      </Form>
      </div>
    </div>
  );
};

export default Page;
