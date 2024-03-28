"use server"

import { db } from "@/lib/db";
import bcrypt from "bcryptjs"
import * as z from "zod";

import { RegisterSchema } from "@/schemas/auth";
import { getUserByEmail } from "@/data/auth/user";
import { generateVerificationToken } from "@/lib/auth/tokens";
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
  
  const newUser = await getUserByEmail(email);

  if  (!newUser) {
    return { error: "Something went wrong!" }
  }
  const verificationToken = await generateVerificationToken(email,newUser.id);
  
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  )


  return { success: "Confirmation email sent!" }
};  