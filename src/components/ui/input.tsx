import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  endAdornment?: React.ReactNode;
  variant?: "default" | "subtle" | "recessed";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      icon,
      endAdornment,
      variant = "default",
      disabled,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default:
        "bg-white border-[#E5E4DF] text-[#18181B] hover:border-[#D5D3CC] focus:border-[#D5D3CC] focus:ring-2 focus:ring-zinc-900/[0.04] shadow-[0_1px_2px_rgba(24,24,27,0.03)]",
      subtle:
        "bg-[#FAF9F6] border-[#ECEBE7] text-[#18181B] hover:bg-white hover:border-[#DFDDD6] focus:bg-white focus:border-[#D5D3CC] focus:ring-2 focus:ring-zinc-900/[0.04]",
      recessed:
        "bg-[#F4F3F0] border-transparent text-[#18181B] hover:bg-[#EDEBE6] focus:bg-white focus:border-[#D5D3CC] focus:ring-2 focus:ring-zinc-900/[0.04]",
    };

    return (
      <div className={cn("relative flex items-center w-full group", className)}>
        {icon && (
          <div className="absolute left-3 flex items-center justify-center pointer-events-none text-[#78756E] group-focus-within:text-[#18181B] transition-colors duration-140">
            {icon}
          </div>
        )}

        <input
          type={type}
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full h-9 rounded-xl border text-[13px] placeholder:text-[#A19E95] transition-all duration-140 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none disabled:cursor-not-allowed disabled:opacity-50",
            icon ? "pl-9" : "pl-3",
            endAdornment ? "pr-9" : "pr-3",
            variantStyles[variant]
          )}
          {...props}
        />

        {endAdornment && (
          <div className="absolute right-2.5 flex items-center justify-center">
            {endAdornment}
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: "default" | "subtle" | "recessed";
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = "default", disabled, ...props }, ref) => {
    const variantStyles = {
      default:
        "bg-white border-[#E5E4DF] text-[#18181B] hover:border-[#D5D3CC] focus:border-[#D5D3CC] focus:ring-2 focus:ring-zinc-900/[0.04] shadow-[0_1px_2px_rgba(24,24,27,0.03)]",
      subtle:
        "bg-[#FAF9F6] border-[#ECEBE7] text-[#18181B] hover:bg-white hover:border-[#DFDDD6] focus:bg-white focus:border-[#D5D3CC] focus:ring-2 focus:ring-zinc-900/[0.04]",
      recessed:
        "bg-[#F4F3F0] border-transparent text-[#18181B] hover:bg-[#EDEBE6] focus:bg-white focus:border-[#D5D3CC] focus:ring-2 focus:ring-zinc-900/[0.04]",
    };

    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full rounded-xl border p-3 text-[13px] placeholder:text-[#A19E95] transition-all duration-140 ease-[cubic-bezier(0.23,1,0.32,1)] focus:outline-none resize-none leading-relaxed disabled:cursor-not-allowed disabled:opacity-50",
          variantStyles[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

