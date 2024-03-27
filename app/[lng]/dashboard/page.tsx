'use client'

import { logout } from "@/actions/auth/logout"; 
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const DashboardPage = () => {
	const user = useCurrentUser();

  const onClick = () => {
    logout()
  }

  return (
	  <div className="flex justify-center items-center">
      <form>
        <Button onClick={onClick}>
          Sign out
        </Button>
      </form>  
    </div>
  );
};

export default DashboardPage;