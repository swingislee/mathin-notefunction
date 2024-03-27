"use client"

import { ElementRef, useEffect, useRef, useState } from "react";
import { FiChevronsLeft } from "react-icons/fi";
import { useMediaQuery } from "usehooks-ts"
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

export const Navigation = () => {
  const pathname = usePathname();
  const isPC = useMediaQuery("(min-width: 768px) and (orientation: landscape)");

  console.log('isPC',isPC)
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
          "w-0 group/sidebar h-full tl:w-60 bg-slate-700 overflow-y-auto relative flex flex-col z-[99999]",
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
        <div>
          <p>Action items</p>
        </div>
        <div className="mt-4">
          <p>Documents</p>
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
          "absolute top-0 z-[99999] left-0 w-full tl:left-60 tl:w-[calc(100%-240px)]",
          isResetting && "transition-all ease-in-out duration-300",
        )}
      >
        <nav className="bg-transparent w-full">
          <HamburgerMenuIcon onClick={resetWidth} role="button" className={`h-6 w-6 mx-3 my-3 text-muted-foreground ${menuVisibilityClass}`} />
        </nav>
      </div>

    </>
  );
};