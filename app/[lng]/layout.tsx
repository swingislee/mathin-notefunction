import "./global.css"

import { dir } from 'i18next'
import { languages, fallbackLng } from '@/lib/i18n/settings'
import { Translate } from '@/lib/i18n'
import Footer from '@/components/Footer'
import { SessionProvider } from "next-auth/react"
import { auth }  from '@/auth'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params: { lng } }: {
  params: {
    lng: string;
  };
}) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { t } = await Translate(lng)
  return {
    title: t('title'),
    content: 'a math place.',    
  }
}

export default async function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode;
  params: {
    lng: string;
}}) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="mathin-theme-2"          
          >
            <div className='h-full'>
              {children}
            </div> 
            <Toaster/>         
            <Footer/>
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  )
}
