import "./global.css"

import { dir } from 'i18next'
import { languages, fallbackLng } from '@/lib/i18n/settings'
import { Translate } from '@/lib/i18n'
import Footer from '@/components/Footer'

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
    content: 'a math place.'
  }
}

export default function RootLayout({
  children,
  params: {
    lng
  }
}: {
  children: React.ReactNode;
  params: {
    lng: string;
  }}) {

  return (
    <html lang={lng} dir={dir(lng)}>
      <head />
      <body>
          <div className='h-full'>
            {children}
          </div>          
          <Footer/>
      </body>
    </html>
  )
}
