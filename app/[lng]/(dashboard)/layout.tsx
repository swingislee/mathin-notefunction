"use client"

import { Navigation } from "./_components/navigation";
import { Sidebar } from "./_components/sidebar";
import { Topbar } from "./_components/topbar";

export default function DashboardLayout({children,
  params: {
      lng
  }
  }: {
    children: React.ReactNode;
    params: {
      lng: string;
    }}) {
  return (
    <div className="tl:py-10 tl:px-20 tl:bg-amber-100 flex justify-center items-center h-full">
      <div className="h-full w-full flex tl:rounded-3xl tl:bg-slate-700 shadow-lg relative overflow-hidden">

        <Navigation />

        <div className="flex-1 h-auto rounded-2xl bg-white overflow-y-auto mb-3 tl:ml-2 tl:mr-3 mt-[3.25rem] overflow-hidden">
          {children}
        </div>

        <div className="absolute w-full h-full z-[99997] overflow-hidden pointer-events-none">
          <Sidebar lng={lng}/>
        </div>
      </div>        

    </div>
  );
};
