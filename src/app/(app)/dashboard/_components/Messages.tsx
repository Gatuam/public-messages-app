"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Message } from "@/models/User";
import { toast } from "sonner";
import axios from "axios";
import { ApiResponse } from "@/types/ApiResponse";

type MessageCardProps = {
  message  : Message;
  onMessageDelete : (messageId : string) => void
}

const Messages = ({ message, onMessageDelete } : MessageCardProps) => {
  const handleDelete = async ()=>{
      const res = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast.success(res.data?.message)
      onMessageDelete(message._id as string)
  }
  return (
    <div className="max-w-2xl mx-auto pt-10 ">
      <Card>
        <CardHeader>
          <CardTitle>
            Messages
          </CardTitle>
          <CardDescription>Get all the public messages</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-5">
          <Dialog >
            <DialogTrigger asChild>
              <Button
              onClick={()=> handleDelete}
              className=" cursor-pointer"
              variant={'destructive'}>
                Delete Message
              </Button>
            </DialogTrigger>
            <DialogContent className="p-3 space-y-4">
              <DialogHeader>
                <DialogTitle className="pb-3">Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your messages and remove your data from our servers.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
};

export default Messages;
