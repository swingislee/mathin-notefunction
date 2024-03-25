'use client'

import { logout } from "@/actions/auth/logout"; 
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingPage = () => {
	const user = useCurrentUser();

  const onClick = () => {
    logout()
  }

  return (
	  <div>
      <form>
        <Button onClick={onClick}>
          Sign out
        </Button>
      </form>  
    </div>
  );
};

export default SettingPage;