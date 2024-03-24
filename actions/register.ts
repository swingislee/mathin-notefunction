"use server"

import { db } from "@/lib/db";
import bcrypt from "bcryptjs"
import * as z from "zod";

import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/auth/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  
  const validatedFields = RegisterSchema.safeParse(values)
  if(!validatedFields.success){
    return{ error: "invalid fields"}
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email);
  
  if  (existingUser) {
    return { error: "Email already in use!" }
  }

  await db.user.create({
    data:{
      name,
      email,
      password: hashedPassword,
    }
  })
  
  const verificationToken = await generateVerificationToken(email);
  
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  )


  return { success: "Confirmation email sent!" }

  return{ success: "yes"}
};  