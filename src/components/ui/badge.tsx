import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "neutral"
    | "emerald"
    | "amber"
    | "rose"
    | "indigo"
    | "violet"
    | "outline";
  size?: "xs" | "sm" | "md";
  uppercase?: boolean;
  dotColor?: string;
}

export function Badge({
  className,
  variant = "neutral",
  size = "sm",
  uppercase = false,
  dotColor,
  children,
  ...props
}: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps["variant"]>, string> = {
    neutral: "bg-[#F1F0EC] text-ink-secondary border border-[#E6E4DF]",
    emerald: "bg-[#E9F9F1] text-[#067647] border border-[#D1F2E1]",
    amber: "bg-[#FEF5E7] text-[#9A6700] border border-[#FCE7C2]",
    rose: "bg-[#FFF1F3] text-[#C01048] border border-[#FFE1E6]",
    indigo: "bg-[#EFF6FF] text-[#1D4ED8] border border-[#DBEAFE]",
    violet: "bg-[#F5F3FF] text-[#6D28D9] border border-[#EDE9FE]",
    outline: "bg-white text-ink-secondary border border-border shadow-xs",
  };

  const sizes: Record<NonNullable<BadgeProps["size"]>, string> = {
    xs: "px-2 py-0.5 text-[10.5px] gap-1",
    sm: "px-2.5 py-0.5 text-[11.5px] gap-1.5",
    md: "px-3 py-1 text-[12.5px] gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium rounded-full whitespace-nowrap leading-none",
        uppercase && "uppercase tracking-wider text-[10.5px] font-semibold",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dotColor && (
        <span
          className="w-2 h-2 rounded-full shrink-0 ring-2 ring-current/15"
          style={{ backgroundColor: dotColor }}
        />
      )}
      {children}
    </span>
  );
}

