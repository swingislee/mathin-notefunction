"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCallback, useState, useTransition } from "react"
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"

import { Translate } from "@/lib/i18n/client"
import { LoginSchema } from "@/schemas/auth"
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
import { FormSuccess } from "../form-success"
import { login } from "@/actions/auth/login"
import Link from "next/link"


export const LoginForm = () => {
	const params = useParams<{ lng: string; }>()
	const { t } = Translate(params.lng)

	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
		?`${t("OAuthAccountNotLinked")}`
		:"";

	const [showTwoFactor,setShowTwoFactor] = useState(false);
	const [error,setError] = useState<string | undefined>("");
	const [success,setSuccess] = useState<string | undefined>("");
	const [isPending, startTransition] = useTransition();

  

	const clearErrorParams = useCallback(() => {
		const searchparams = new URLSearchParams(searchParams.toString());
	
		searchparams.delete("error");
		return searchparams.toString();
	}, []);
	

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

	if (searchParams.get("error")){
		console.log("redirect")
  const queryString = clearErrorParams(); // This will be an empty string
  router.push(`${pathname}?${queryString}`); // Navigates without any search parameters
	}

	startTransition(() => {
		login(values,params.lng,callbackUrl)
			.then((data) =>{
				if (data?.error) {
					setError(data.error);
				}
				if (data?.success) {
					form.reset();
					setSuccess(data.success);
				}
				if (data?.twoFactor) {
					setShowTwoFactor(true);
				}
			})

				.catch(() => setError("something went wrong"))
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
				<div className="space-y-4">
					{showTwoFactor && (
						<FormField 
								control={form.control}
								name="code" 
								render={({field}) => (
									<FormItem>
										<FormLabel>{t('Two Factor code')}</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={isPending}
												placeholder="123456"
											/>
										</FormControl>
										<FormMessage/>
									</FormItem>
								)}
						/>
					)}

					{!showTwoFactor && (
						<>
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
										<Button size="sm" variant="link" asChild className="px=0 font-normal right-0">
											<Link href={`/${params.lng}/auth/reset`}>
												{t("Forgotpassword")}
											</Link>
										</Button>
									</FormItem>
								)}
							/>
						</>
					)}
				</div>
				<FormError message={error || urlError }/>
				<FormSuccess message={success}/>
				<Button
					disabled={isPending}
					type="submit"
					className="w-full"
				>
					{showTwoFactor ? `${t("confirm")}` : `${t('login')}`}					 
				</Button>

				</form>
			</Form>
		</CardWrapper>
  );
};

