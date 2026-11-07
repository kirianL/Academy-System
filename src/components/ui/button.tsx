import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";
import { CircleNotch } from "@phosphor-icons/react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "recessed"
    | "pill-dark"
    | "pill-light"
    | "danger-outline"
    | "ghost";
  size?: "xs" | "sm" | "md" | "lg" | "icon";
  asChild?: boolean;
  staticPress?: boolean;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      asChild = false,
      staticPress = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    // Emil Kowalski craft: tactile surfaces, inner highlights, exact edge borders
    const variants: Record<NonNullable<ButtonProps["variant"]>, string> = {
      primary:
        "relative bg-[#18181B] text-white hover:bg-[#27272A] border border-[#18181B] shadow-[0_1px_2px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] before:absolute before:inset-0 before:rounded-[inherit] before:border-t before:border-white/20 before:pointer-events-none",
      secondary:
        "bg-white text-[#18181B] border border-[#E5E4DF] hover:bg-[#FAF9F6] hover:border-[#D5D3CC] shadow-[0_1px_2px_rgba(24,24,27,0.03),inset_0_1px_0_rgba(255,255,255,0.9)]",
      recessed:
        "bg-[#F4F3F0] text-[#18181B] border border-transparent hover:bg-[#EDEBE6] hover:border-[#E5E4DF]",
      "pill-dark":
        "relative bg-[#18181B] text-white hover:bg-[#27272A] border border-[#18181B] rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.16)] before:absolute before:inset-0 before:rounded-full before:border-t before:border-white/20 before:pointer-events-none",
      "pill-light":
        "bg-white text-[#18181B] border border-[#ECEBE7] hover:bg-[#FAF9F6] rounded-full shadow-[0_1px_2px_rgba(24,24,27,0.03)]",
      "danger-outline":
        "bg-white text-[#DC2626] border border-[#FCA5A5]/60 hover:bg-[#FEF2F2] hover:border-[#F87171] shadow-2xs",
      ghost:
        "bg-transparent text-[#52504A] hover:bg-[#F4F3F0] hover:text-[#18181B]",
    };

    const sizes: Record<NonNullable<ButtonProps["size"]>, string> = {
      xs: "h-7 px-2.5 text-[11.5px] rounded-lg gap-1.5",
      sm: "h-8 px-3 text-[12.5px] rounded-xl gap-1.5",
      md: "h-9 px-3.5 text-[13px] rounded-xl gap-2",
      lg: "h-10 px-4 text-[13.5px] rounded-xl gap-2",
      icon: "h-8 w-8 rounded-xl justify-center p-0",
    };

    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium whitespace-nowrap select-none transition-all duration-140 ease-[cubic-bezier(0.23,1,0.32,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-1 disabled:pointer-events-none disabled:opacity-45 cursor-pointer",
          !staticPress && "active:scale-[0.97]",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="inline-flex items-center gap-1.5 animate-pulse">
            <CircleNotch weight="bold" className="w-3.5 h-3.5 animate-spin" />
            <span className="opacity-80">Cargando...</span>
          </span>
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";
