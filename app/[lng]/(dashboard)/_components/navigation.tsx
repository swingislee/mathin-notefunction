"use client"

import { cn } from "@/lib/utils";
import Link from "next/link";

import { ElementRef, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "usehooks-ts"
import { useParams, usePathname } from "next/navigation";
import { Translate } from "@/lib/i18n/client";

import { Button } from "@/components/ui/button";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { BsCardList } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { FiChevronsLeft } from "react-icons/fi";


export const Navigation = () => {
  const pathname = usePathname();
  const isPC = useMediaQuery("(min-width: 768px) and (orientation: landscape)");

  const params = useParams<{ lng:string }>();
  const { t } = Translate(params.lng);

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<"aside">>(null);
  const navbarRef = useRef<ElementRef<"div">>(null);
  const [isResetting, setIsResetting] = useState(false);

  const [menuVisibilityClass, setMenuVisibilityClass] = useState("");

  useEffect(() => {

    if (isPC) {
      resetWidth();
    } else {
      collapse();
    }

  }, [isPC]);

  useEffect(() => {
    if (!isPC) {
      collapse();
    }
  }, [isPC,pathname]);

  useEffect(() => {
    // Update the visibility class based on isPC
    setMenuVisibilityClass(isPC ? "hidden" : "block");
  }, [isPC]);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener("mousemove",handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    if (!sidebarRef.current) return;

    const sidebarRect = sidebarRef.current.getBoundingClientRect();
    let newWidth = event.clientX - sidebarRect.left;
    
    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty("left", `${newWidth}px`);
      navbarRef.current.style.setProperty("width", `calc(100% - ${newWidth}px)`);
    }
  }

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {

      setMenuVisibilityClass("hidden");
      setIsResetting(true);

      sidebarRef.current.style.width = isPC ? "240px" : "100%";
      navbarRef.current.style.setProperty("width", isPC ? "calc(100% - 240px)" : "0");
      navbarRef.current.style.setProperty("left", isPC ? "240px" :"100%");

      setTimeout(() => setIsResetting(false), 300);
    }
  }

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setMenuVisibilityClass("block");
      setIsResetting(true);
      
      sidebarRef.current.style.width = "0";
      navbarRef.current.style.setProperty("width", "100%");
      navbarRef.current.style.setProperty("left", "0");

      setTimeout(() => setIsResetting(false), 300);
    }
  }

  return (
    <>
      <aside
        ref={sidebarRef}
        className={cn(
          "w-0 group/sidebar h-full tl:w-60 bg-slate-700 overflow-x-hidden relative flex flex-col z-[99999]",
          isResetting && "transition-all ease-in-out duration-300",        
        )}
      >
        <div 
          onClick={collapse}
          role="button"
          className={cn(
            "opacity-100 tl:opacity-0 h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 group-hover/sidebar:opacity-100",
          )}
        >
          <FiChevronsLeft className="h-6 w-6"/>
        </div>
        <div className="flex pt-3 pl-3 w-full h-12 items-center text-2xl"> 
          {t('title')}
        </div>
        <div className="flex flex-col pl-3 pr-2 w-full mt-10 space-y-4 justify-center items-center">
          <Button
            asChild
            variant={pathname === `/${params.lng}/admin` ? "default" : "outline"}     
            className="w-full justify-start pl-4"        
          >   
            <Link href= {`/${params.lng}/admin`} className="w-full justify-start pl-4 flex flex-row items-center space-x-3">
   
                <RiAdminLine/> 
                <div>{t("admin")}</div>
            </Link>
          </Button>


          <Button
            asChild
            variant={pathname === `/${params.lng}/documents` ? "default" : "outline"}     
            className="w-full justify-start pl-4"        
          >   
            <Link href= {`/${params.lng}/documents`} className="w-full justify-start pl-4 flex flex-row items-center space-x-3">
   
                <BsCardList/> 
                <div>{t("documents")}</div>
            </Link>
          </Button>

          <Button
            asChild
            variant={pathname === `/${params.lng}/client` ? "default" : "outline"}             
            className="w-full"        
          >
            <Link href= {`/${params.lng}/client`}>
             client  
            </Link>
          </Button>

          <Button
            asChild
            variant={pathname === `/${params.lng}/server` ? "default" : "outline"}             
            className="w-full"        
          >
            <Link href= {`/${params.lng}/server`}>
              server
            </Link>
          </Button>

          <Button
            asChild
            variant={pathname === `/${params.lng}/settings` ? "default" : "outline"}             
            className="w-full"        
          >
            <Link href= {`/${params.lng}/settings`}>
             settings
            </Link>
          </Button>

        </div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          "absolute top-0 z-[99996] left-0 w-full tl:left-60 tl:w-[calc(100%-240px)] overflow-hidden",
          isResetting && "transition-all ease-in-out duration-300",
        )}
      >
        <nav className="bg-transparent  w-full">
          <HamburgerMenuIcon onClick={resetWidth} role="button" className={`h-6 w-6 mx-4 my-4 text-muted-foreground ${menuVisibilityClass}`} />
        </nav>
      </div>

    </>
  );
};