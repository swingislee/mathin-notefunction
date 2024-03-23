"use server"
import * as z from "zod";

//import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas";
//import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";


export const login = async (values: z.infer<typeof LoginSchema>, lng:string) => {

  
/*
  const validatedFields = LoginSchema.safeParse(values);
  

  if(!validatedFields.success){
    return{ error: "invalid fields"}
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: `/${lng}${DEFAULT_LOGIN_REDIRECT}`,
    })
  } catch (error) {
    if (error instanceof AuthError){
      switch(error.type){
        case "CredentialsSignin":
          return { error:"invalid credentials!" }
        default:
          return { error:"something went wrong" }
      }
    }

    throw error;
  }

  */
};