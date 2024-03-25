import { Sidebar } from "@/components/Sidebar";

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
    <div className="w-full h-full tl:py-10 tl:px-20 bg-amber-100">
        <div className="w-full h-full tl:rounded-3xl overflow-hidden bg-white ">
          <div className="absolute z-10 flex items-center justify-center">
             {children}
          </div>
          <Sidebar lng={lng}/>
        </div>
    </div>
  );
};
