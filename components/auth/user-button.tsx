"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"

import { useCurrentUser } from "@/hooks/use-current-user";


import Image from "next/image";
import { LogoutButton } from "./logout-button";
import { BsBoxArrowLeft } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";

export const UserButton = () => {
  const user = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex flex-row items-center">
        {user?.name}
        <BsChevronDown className="h-3 w-3 ml-1" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <LogoutButton>
          <DropdownMenuItem className="flex flex-row items-center">
            <BsBoxArrowLeft className="h-4 w-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </LogoutButton>


      </DropdownMenuContent>

    </DropdownMenu>
  );
};