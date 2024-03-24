"use server"
import * as z from "zod";

import { signIn } from "@/auth";
import { LoginSchema } from "@/schemas/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

import { sendVerificationEmail } from "@/lib/auth/mail";

import { generateVerificationToken } from "@/lib/auth/token";
import { getUserByEmail } from "@/data/auth/user";


export const login = async (
  values: z.infer<typeof LoginSchema>, 
  lng:string,
  callbackUrl?: string | null,
) => {
  const validatedFields = LoginSchema.safeParse(values);  

  if(!validatedFields.success){
    return{ error: "invalid fields"}
  }

  const { email, password } = validatedFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist"}
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token,
    )

    return { success: " Confirmation email sent!" };
  }


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
};