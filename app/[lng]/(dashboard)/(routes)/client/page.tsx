'use client'

import { UserInfo } from "@/components/user-info";
import { useCurrentUser } from "@/hooks/use-current-user";

const DocumentsPage = () => {
  const user =  useCurrentUser();

  return (
    <div className="p-4">
    
      <UserInfo
        label="Client components"
        user = {user}
      />
    </div>
  );
};

export default DocumentsPage;