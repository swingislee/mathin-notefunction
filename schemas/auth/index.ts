import * as z from "zod"

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required"
  }),
  password: z.string().min(1,{
    message: "Password is required"
  })
}) 

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email is required"
  }),
  password: z.string().min(1,{
    message: "Minimum 6 charaers is required"
  }),
  name: z.string().min(1,{
    message: "Name is required"
  }),
}) 

export const ResetSchema = z.object({
  email: z.string().email({
    message: "email is required"
  }),
}) 