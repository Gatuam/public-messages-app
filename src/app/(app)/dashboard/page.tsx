"use client";
import { Message } from "@/models/User";
import { AccpectMessage } from "@/Schemas/AccpectMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import Messages from "./_components/Messages";

const page = () => {
  const [messages, setMessage] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [switchLoading, setSwitchLoading] = useState(false);
  const { data: session } = useSession();

  const handleDeleteMessage = (messageId: string) => {
    setMessage(messages.filter((message) => message._id !== messageId));
  };
  const from = useForm({
    resolver: zodResolver(AccpectMessage),
  });
  const { register, watch, setValue } = from;
  const accpectMessages = watch("accpectMessage");

  const fetchAccpectMessage = useCallback(async () => {
    setSwitchLoading(true);
    try {
      const res = await axios.get("/api/accpect-message");
      setValue("accpectMessage", res.data.isAccpectingMessages);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(`Failed to fecth the message status error`);
    } finally {
      setSwitchLoading(false);
    }
  }, [setValue]);
  const fetchNMessages = useCallback(
    async (resfresh: boolean = false) => {
      setLoading(true);
      setSwitchLoading(false);
      try {
        const res = await axios.get<ApiResponse>("/api/get-message");
        setMessage(res.data?.messages || []);
        if (resfresh) {
          toast.error("shwoing latest messages");
        }
      } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>;
        toast.error(`Failed to fecth the message server error ${axiosError}`);
      } finally {
        setLoading(false);
        setSwitchLoading(false);
      }
    },
    [setLoading, setMessage]
  );

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    fetchNMessages();
    fetchAccpectMessage();
  }, [session, setValue, fetchAccpectMessage, fetchNMessages]);

  const handleSwitch = async () => {
    try {
      const res = await axios.post("/api/accpect-message", {
        accpectMessages: !accpectMessages,
      });
      setValue("accpectMessage", !accpectMessages);
      toast.success(res.data.message);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(`Failed to switching status, ${axiosError}`);
    }
  };
  if (!session || !session.user) {
    return <div>Please login</div>;
  }

  return (
    <div className="w-full justify-center items-center bg-black ">
      <div className=" max-w-7xl mx-auto justify-center items-center">hi</div>
    </div>
  );
};

export default page;
