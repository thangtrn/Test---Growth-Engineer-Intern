"use client";
import { ExternalLink } from "lucide-react";
import React from "react";
import usePortal from "react-cool-portal";
import SharedModal from "./SharedModal";

const SharedSticky = () => {
   const { Portal, toggle, hide } = usePortal({ defaultShow: false });

   return (
      <>
         <div className="fixed top-2/4 right-0 z-50 w-fit cursor-pointer bg-filum px-3 py-2 origin-top-right rotate-90 bg-primary rounded">
            <button className="f-center gap-2" onClick={toggle}>
               <div className="text-sm rotate-[180deg] font-medium text-white">
                  Phản hồi
               </div>
               <ExternalLink size={16} className="rotate-[270deg]" />
            </button>
         </div>

         <Portal>
            <SharedModal hide={hide} />
         </Portal>
      </>
   );
};

export default SharedSticky;
