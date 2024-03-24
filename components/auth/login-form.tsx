"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"


import { Translate } from "@/lib/i18n/client"
import { useParams, useSearchParams } from "next/navigation"

import { LoginSchema } from "@/schemas"
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CardWrapper } from "./card-wrapper";
import { FormError } from "../form-error"
import { FormSusses } from "../form-success"
import { login } from "@/actions/login"


export const LoginForm = () => {
	const params = useParams<{ lng: string; }>()
	const { t } = Translate(params.lng)

	const searchParams = useSearchParams()
	const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
		?`${t("OAuthAccountNotLinked")}`
		:"";

	const [error,setError] = useState<string | undefined>("");
	const [success,setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof LoginSchema>>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: "",
			password: "",
		}
	})

const onSubmit = (values: z.infer<typeof LoginSchema>) => {
	setError("")
	setSuccess("")

	startTransition(() => {
		login(values,params.lng)
			.then((data) =>{
				setError(data?.error)
				// todo  add when we add 2fa
				//setSuccess(data?.success)
			})
	  });
}

  return (    
		<CardWrapper
			titleLabel={t('auth')}
			headerLabel={t("Welcom back")}
			backButtonLabel={t('Donthaveanaccount')}
			backButtonHref={`/${params.lng}/auth/register`}
			showSocial			
		>
			<Form {...form}>
				<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6"
				>
				<div className="space-y-2">
					<FormField 
						control={form.control}
						name="email" 
						render={({field}) => (
							<FormItem>
								<FormLabel>{t('Email')}</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="john.doe@example.com"
										type="email"
									/>
								</FormControl>
								<FormMessage/>
							</FormItem>
						)}
					/>
					<FormField 
						control={form.control}
						name="password" 
						render={({field}) => (
							<FormItem>
								<FormLabel>{t('password')}</FormLabel>
								<FormControl>
									<Input
										{...field}
										disabled={isPending}
										placeholder="******"
										type="password"
									/>
								</FormControl>
								
							</FormItem>
						)}
					/>
				</div>
				<FormError message={error || urlError }/>
				<FormSusses message={success}/>
				<Button
					disabled={isPending}
					type="submit"
					className="w-full"
				>
					 {t('login')}
				</Button>

				</form>
			</Form>
		</CardWrapper>
  );
};

