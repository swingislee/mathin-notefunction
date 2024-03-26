"use client"

import { useScrollTop } from "@/hooks/use-scroll-top";
import { Translate } from "@/lib/i18n/client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams } from "next/navigation";

export const Navbar = () => {
  const scrolled = useScrollTop();
  const params = useParams<{ lng: string; }>();

  const { t } = Translate(params.lng)

  const linkbase = 'sl:px-1 sl:rounded  sl:border-2 sl:border-transparent sl:hover:border-slate-500 sl:dark:hover:border-amber-200';
  const navbarbase = `fixed sl:text-xl top-auto sl:bottom-auto sl:top-0 dl:gap-4 sl:gap-8 sl:justify-center border-t border-transparent `
  const fontbase = `${params.lng === 'en' ? 'text-xl' : 'text-2xl'} `

  const classValue ="flex items-center rounded-md p-2  dl:px-2 dl:py-0 "+ linkbase ;
  const ContainerCss ="flex justify-evenly  items-center align-middle w-full h-12 bottom-4 bg-amber-100 dark:bg-slate-500 "+ navbarbase + " " + fontbase ;


  return (
      <>
      <div className="fixed bg-white bottom-0 w-full h-16 sl:hidden"/>
      <div className={cn(ContainerCss,scrolled && "border-t sl:border-b border-gray-200 shadow-sm")}>
        <Link href={`/${params.lng}/story`}  className={classValue}> {t('story')} </Link>
        <Link href={`/${params.lng}/games`}  className={classValue}> {t('games')} </Link>
        <Link href={`/${params.lng}/minds`}  className={classValue}> {t('minds')} </Link>
        <Link href={`/${params.lng}/terms`}  className={classValue}> {t('terms')} </Link>
        <Link href={`/${params.lng}/tools`}  className={classValue}> {t('tools')} </Link>
      </div>
      </>
  );
};