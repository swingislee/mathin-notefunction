"use server"

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/auth/user";
import { getVerificationTokenByToken } from "@/data/auth/verification-token";
import { getUserById } from "@/data/auth/user";

export const newVerification = async (token: string) => {
  
  const existingToken = await getVerificationTokenByToken(token)

  if (!existingToken) {
    return { error: "Token does not exist!" };
  }

  const hasExpired = new Date(existingToken.expires) < new Date() ;
  
  if (hasExpired) {
    return { error: "Token has expired" }
  }

  const existingUser = await getUserById(existingToken.userId)


  if (!existingUser) {
    return { error: "User does not exist" };   
  }


  await db.user.update({
    where: { id: existingUser.id},
    data: {
      emailVerified: new Date(),
      email: existingToken.email
    }
  })

  await db.verificationToken.delete({
    where: { id: existingToken.id }
  })

  return { success:"Email verified" }
  }

