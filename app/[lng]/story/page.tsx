import { Translate } from "@/lib/i18n";
import Link from "next/link";
import { Navbar } from "./_components/navbar";

export default async function storyPage ({ params: { lng } }: {
  params: {
    lng: string;
  };
  }){
    const { t } = await Translate(lng)

    return (
    <>
    <div className="sl:pt-12 h-full bg-amber-100">
         
      <h1>{JSON.stringify(lng)}</h1>

      <Link href={`/${lng}`}> {t("title")} </Link>  
    </div>  
    <div className="sl:pt-12 h-full bg-amber-100"></div>
    <Navbar/>
    </>
    );
  }