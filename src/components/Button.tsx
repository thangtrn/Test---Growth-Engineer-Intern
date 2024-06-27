import React from "react";
import { cn } from "~/lib/cn";

interface IButtonProps {
   variant?: "default" | "flat" | "ghost";
   selected?: boolean; // only for "glost" variant
   disabled?: boolean;
   className?: string;
   children: React.ReactNode;
   type?: "button" | "submit";
   onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
   leftIcon?: React.ReactNode;
   rightIcon?: React.ReactNode;
   loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
   variant = "default",
   selected,
   disabled,
   className,
   children,
   onClick,
   type = "button",
   leftIcon,
   rightIcon,
   loading = false,
}) => {
   return (
      <button
         type={type}
         onClick={onClick}
         disabled={disabled || loading}
         className={cn(
            "f-center gap-2",
            "w-full h-10 px-2.5 text-sm rounded font-medium active:opacity-70 transition-opacity border-2 border-transparent disabled:opacity-50",
            variant === "default" && "bg-primary",
            variant === "flat" && "bg-white text-primary",
            variant === "ghost" &&
               (selected ? "border-primary" : "border-white"),
            className
         )}
      >
         {loading ? (
            <span>Loading...</span>
         ) : (
            <>
               {leftIcon}
               <span>{children}</span>
               {rightIcon}
            </>
         )}
      </button>
   );
};

export default Button;
