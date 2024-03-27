"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar"
import { BsPersonBoundingBox } from "react-icons/bs";

import { useCurrentUser } from "@/hooks/use-current-user";

import Image from "next/image";

export const AvatarButton = () => {
  const user = useCurrentUser();

  return (
    <Avatar className="h-6 w-6">          
    <AvatarImage src={user?.image || ""} />
      <AvatarFallback>
        <Image src={"/assets/avatars/initial/boy.png"} width={1000} height={1000} alt="avatar" />
      </AvatarFallback> 
    </Avatar>
  );
};