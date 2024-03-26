import { Sidebar } from "../_components/sidebar";

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
    <div className="tl:py-10 tl:px-20 bg-amber-100 flex justify-center items-center h-full">
      <div className="w-full h-full tl:rounded-3xl bg-slate-700 shadow-lg overflow-hidden relative">
       <div className="absolute inset-0 tl:pt-14 tl:pr-3 tl:pl-40 tl:pb-5">
        <div className="w-full h-full tl:rounded-2xl bg-white flex justify-center items-center">
            {children}
          </div>
        </div>
        <div className="absolute w-full h-full z-20 overflow-hidden pointer-events-none">
          <Sidebar lng={lng}/>
        </div>
        </div>
    </div>
  );
};
