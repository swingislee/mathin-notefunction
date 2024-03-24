"use client";

import { BeatLoader } from "react-spinners"

import { newVerification } from "@/actions/auth/new-verification";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { FormError } from "../form-error";
import { FormSusses } from "../form-success";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect,useState } from "react";

export const NewVerificationForm  = () => {
  const [error , setError] = useState<string | undefined>();
  const [success , setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if(!token) return

    newVerification(token,success)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() =>{
        setError("Something went wrong!")
      })
  },[token,success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
        <CardWrapper
            headerLabel="Confirming your verification"
            titleLabel="Auth"
            backButtonHref="/auth/login"
            backButtonLabel="Back to login"            
        > 
            <div className="flex items-center w-full justify-center">              
              {!success && !error && (<BeatLoader/>)}
              
		      		<FormSusses message={success}/>
              {!success && (
                <FormError message={error}/>
              )}
            </div> 
        </CardWrapper>
    </div>
  );
};