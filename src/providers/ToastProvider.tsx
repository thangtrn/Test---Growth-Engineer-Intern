"use client";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ToastProviderProps {
   children: React.ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
   return (
      <>
         {children}
         <ToastContainer autoClose={1500} />
      </>
   );
};

export default ToastProvider;
