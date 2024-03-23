import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

import Github from "next-auth/providers/github"
import type { OAuthConfig } from "@auth/core/providers"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "./data/user";

export interface WeChatProfile {
	openid: string
	nickname: string
	sex: number
	province: string
	city: string
	country: string
	headimgurl: string
	privilege: string[]
	unionid: string
	[claim: string]: unknown
}


export default {
  providers: [
    {
      id: 'wechat',
      name: 'WeChat',
      type: 'oauth',
      style: { logo: 'assets/wechat.svg', bg: '#fff', text: '#000' },
      checks: ["pkce", "state"],
      clientId: process.env.AUTH_WECHAT_APP_ID,
      clientSecret: process.env.AUTH_WECHAT_APP_SECRET!,
      authorization: {
        url: "https://open.weixin.qq.com/connect/oauth2/authorize",
        params: { 
          appid: process.env.AUTH_WECHAT_APP_ID,
          response_type: 'code',
          scope:"snsapi_base",
          state: Math.random(),
        },
      },
      token: {
        url: 'https://api.weixin.qq.com/sns/oauth2/access_token',
        params: {
          appid: process.env.AUTH_WECHAT_APP_ID!,
          secret: process.env.AUTH_WECHAT_APP_SECRET!,
          code: 'CODE',
          grant_type: 'authorization_code',
        }},
      userinfo: {
        url: 'https://api.weixin.qq.com/sns/userinfo',
        request: async ({ tokens, provider }:any) => {
          const url = new URL(provider.userinfo?.url!)
          url.searchParams.set('access_token', tokens.access_token!)
          url.searchParams.set('openid', String(tokens.openid))
          url.searchParams.set('lang', 'zh_CN')
          const response = await fetch(url)
          return response.json()
        },
      },
      profile(profile:any, tokens:any) {
        return {
          id: profile.unionid,
          name: profile.nickname,
          email: null,
          image: profile.headimgurl,
        };
      },
    }satisfies OAuthConfig<WeChatProfile>,

    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success){
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(
            password,
            user.password
          );

          if (passwordsMatch) return user;
        }

        return null;
      }
    })
  ],
} satisfies NextAuthConfig