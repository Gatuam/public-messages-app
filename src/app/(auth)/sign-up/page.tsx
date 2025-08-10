"use client";
import React, { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {  z } from "zod";
import { signUpValidation } from "@/Schemas/SignUpSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const page = () => {
  const [username, setUsername] = useState("");
  const [checkuUsername, setCheckUsername] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [debouncedUsername, setValue] = useDebounceValue(username, 500);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpValidation>>({
    resolver: zodResolver(signUpValidation),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const CheckUsername = async () => {
      setCheckUsername(true);
      setUsernameMessage("");
      try {
        const res = await axios.get(
          `/api/username-unique?username=${debouncedUsername}`
        );
        console.log(`res from checkuniqueusername ${res}`);
        setUsernameMessage(res.data.message);
      } catch (error) {
        const apiError = error as AxiosError<ApiResponse>;
        const errorMessage = setUsernameMessage(apiError.response?.data.message ?? "");
        console.log(errorMessage)
      } finally {
        setCheckUsername(false);
      }
    };

  }, [debouncedUsername]);

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
    <div className="w-full min-h-screen  flex flex-col justify-center items-center">
      <div className="max-w-7xl mx-auto p-6 space-y-6">

      </div>
      <div className="w-full max-w-sm mx-auto border border-[#8686865a] rounded-lg p-6 ">
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
            <Link className="text-sm tracking-tight text-blue-400" href='/sign-in'>Sign-in</Link>
          </h4>
        </div>
        </form> 
      </Form>
      </div>
    </div>
  );
};

export default page;
