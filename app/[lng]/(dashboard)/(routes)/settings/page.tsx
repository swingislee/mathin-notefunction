'use client'

import { logout } from "@/actions/auth/logout"; 
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useSession } from "next-auth/react";

const DocumentsPage = () => {
  const session = useSession();

  const onClick = () => {
    logout()
  };

  return (
	  <div className="flex flex-col h-full justify-center rounded-2xl bg-white items-center">

      <div className="text-black word-break: break-all">
      {JSON.stringify(session)}
      </div> 
      
      <form>
        <Button onClick={onClick}>
          Sign out
        </Button>
      </form>  
    </div>
  );
};

export default DocumentsPage;