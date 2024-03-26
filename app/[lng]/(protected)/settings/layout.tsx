import { Navbar } from "../_components/navbar";
import { Sidebar } from "../_components/sidebar";
import { Topbar } from "../_components/topbar";

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
      <div className="w-full h-full tl:rounded-3xl tl:bg-slate-700 shadow-lg overflow-hidden relative">
        <div className="absolute  flex flex-row space-x-5 inset-0 tl:pt-3 tl:pr-3 tl:pl-3 tl:pb-5">

          <div className="h-full z-20 tl:rounded-2xl overflow-hidden  pointer-events-none">
            <Navbar />
          </div>      

          <div className="flex flex-col space-y-2 h-full w-full z-20 tl:rounded-2xl overflow-hidden pointer-events-none">

            <div className="z-20 h-8 tl:rounded-2xl overflow-hidden  bg-white flex items-center pointer-events-none">
              <Topbar /> 
            </div>      
          
            <div className="tl:rounded-2xl h-full w-full bg-white flex justify-center items-center">
              {children}
            </div>

          </div>
        </div>
        
        <div className="absolute w-full h-full z-20 overflow-hidden pointer-events-none">
          <Sidebar lng={lng}/>
        </div>
        </div>
    </div>
  );
};
