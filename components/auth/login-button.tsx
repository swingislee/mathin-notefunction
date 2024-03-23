"use client"
import { useRouter } from 'next/navigation'
import { Translate } from "@/lib/i18n/client"
import { useParams } from "next/navigation"

interface LoginButtonProps{
    children:React.ReactNode;
    mode?:"modal"|"redirect",
    asChild?:boolean;
};

export const LoginButton = ({
    children,
    mode = "redirect",
    asChild
}:LoginButtonProps) =>{
    const params = useParams<{ lng: string; }>()
	  const { t } = Translate(params.lng)
    const router = useRouter()

    if (mode === "modal"){
        return(
            <span>
              TODO: implement modal   
            </span>
        )    }

    return(
        <span onClick={()=> router.push(`/${params.lng}/auth/login`)} className="cursor-pointer">
            {children}
        </span>
    );
};