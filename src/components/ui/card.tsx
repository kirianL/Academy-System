"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SlotText } from "slot-text/react";
import {
  ArrowUp,
  ArrowDown,
  Info,
  DotsThree,
} from "@phosphor-icons/react";

export function Card({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-surface border border-border-subtle rounded-2xl shadow-card",
        className
      )}
      {...props}
    />
  );
}

/**
 * Reference 1 (Spark Pixel Team) KPI Card:
 * - Concentric 2-Layer Shell (#F4F3F0 outer + #FFFFFF inner)
 * - Technical Monospace Numerals with SlotText tactile roll
 * - 6-Bar Vertical Line Sparkline with Horizontal Reference Line
 * - Recessed Bottom Trend Footer
 */
export interface MetricShellCardProps {
  label: string;
  value: string;
  unit?: string;
  trendValue: string;
  trendLabel: string;
  trendPositive?: boolean;
  sparklineValues?: number[]; // 0 to 100
  highlightIndex?: number;
  onClick?: () => void;
  className?: string;
}

export function MetricShellCard({
  label,
  value,
  unit,
  trendValue,
  trendLabel,
  trendPositive = true,
  sparklineValues = [38, 62, 45, 92, 58, 70],
  highlightIndex = 3,
  onClick,
  className,
}: MetricShellCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group bg-[#F4F3F0] border border-[#EAE8E3] rounded-2xl p-1.5 flex flex-col justify-between transition-all duration-200 hover:border-[#DCDAD2]",
        onClick && "cursor-pointer press-scale",
        className
      )}
    >
      {/* Inner White Surface (Concentric radius: outer 16px - padding 6px = 10px/11px) */}
      <div className="flex-1 bg-white rounded-[11px] px-4 py-4 shadow-[0_1px_2px_rgba(24,24,27,0.03)] border border-black/[0.03] flex items-center justify-between gap-2.5">
        <div className="min-w-0">
          <div className="text-[11px] font-medium tracking-[0.06em] uppercase text-[#78756E] mb-2 truncate">
            {label}
          </div>
          <div className="flex items-baseline gap-1.5 whitespace-nowrap">
            <SlotText
              text={value}
              options={{
                duration: 360,
                stagger: 28,
                bounce: 0.4,
                direction: "up",
              }}
              className="font-mono text-[23px] font-bold tracking-[-0.04em] text-[#18181B] tabular-nums leading-none"
            />
            {unit && (
              <span className="text-[11.5px] font-normal text-[#8C8980] whitespace-nowrap">
                {unit}
              </span>
            )}
          </div>
        </div>

        {/* Reference 1 Discrete 6-Bar Vertical Line Sparkline with Midline */}
        <div
          className="relative flex items-end gap-[5px] h-10 shrink-0 pt-1 px-0.5"
          aria-hidden="true"
        >
          {/* Faint Horizontal Dashed Reference Line (exact Reference 1 detail) */}
          <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-[#ECEAE4] pointer-events-none" />
          {sparklineValues.map((val, idx) => {
            const isHighlighted = idx === highlightIndex;
            return (
              <div
                key={idx}
                className="relative z-10 flex flex-col items-center justify-end h-full w-[3px]"
              >
                <div
                  className={cn(
                    "w-[2px] rounded-full transition-all duration-300 group-hover:scale-y-105 origin-bottom",
                    isHighlighted ? "bg-[#18181B]" : "bg-[#E2E0DA]"
                  )}
                  style={{ height: `${Math.max(22, Math.min(100, val))}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Recessed Bottom Trend Bar */}
      <div className="px-2.5 pt-2 pb-1 flex items-center justify-between text-[12px]">
        <span
          className={cn(
            "w-4 h-4 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105",
            trendPositive
              ? "bg-[#DFDDD6] text-white"
              : "bg-[#FEE4E2] text-[#D92D20]"
          )}
        >
          {trendPositive ? (
            <ArrowUp weight="bold" className="w-2.5 h-2.5" />
          ) : (
            <ArrowDown weight="bold" className="w-2.5 h-2.5" />
          )}
        </span>
        <div className="flex items-center gap-1 tabular-nums">
          <SlotText
            text={trendValue}
            options={{ duration: 300, stagger: 20, bounce: 0.3 }}
            className={cn(
              "font-semibold",
              trendPositive ? "text-[#10B981]" : "text-[#E11D48]"
            )}
          />
          <span className="text-[#78756E]">{trendLabel}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Reference 1 & Reference 5 Concentric Section Container
 * (Warm recessed header + crisp white inner body)
 */
export interface SectionShellCardProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  headerRight?: React.ReactNode;
  showInfoIcon?: boolean;
  infoTooltipText?: string;
  onMoreClick?: () => void;
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function SectionShellCard({
  title,
  subtitle,
  icon,
  headerRight,
  showInfoIcon = false,
  infoTooltipText = "Indicador calculado en tiempo real sobre los 568 expedientes activos de Institución Demo NEXUS.",
  onMoreClick,
  children,
  className,
  innerClassName,
}: SectionShellCardProps) {
  return (
    <div
      className={cn(
        "bg-[#F4F3F0] border border-[#EAE8E3] rounded-2xl p-1.5 flex flex-col",
        className
      )}
    >
      {/* Outer Shell Header */}
      <div className="px-3.5 py-2.5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <div className="w-8 h-8 rounded-full bg-white border border-[#E6E4DF] shadow-xs flex items-center justify-center text-ink-primary shrink-0">
              {icon}
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h3
                className={cn(
                  "font-medium text-[#6E6B64] tracking-[0.05em]",
                  subtitle
                    ? "text-[13.5px] font-semibold text-ink-primary tracking-normal"
                    : "text-[11.5px] uppercase"
                )}
              >
                {title}
              </h3>
              {showInfoIcon && (
                <div className="relative group inline-flex items-center">
                  <button
                    type="button"
                    aria-label="Información metodológica del indicador"
                    className="text-[#C2BFB6] hover:text-ink-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-full p-0.5 transition-colors"
                  >
                    <Info weight="fill" className="w-3.5 h-3.5 shrink-0" />
                  </button>
                  <div
                    role="tooltip"
                    className="pointer-events-none opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-150 absolute left-full ml-2.5 top-1/2 -translate-y-1/2 w-72 bg-[#23201E] text-white text-[11.5px] leading-relaxed px-3 py-2 rounded-xl shadow-popover z-40 font-normal normal-case tracking-normal"
                  >
                    {infoTooltipText}
                  </div>
                </div>
              )}
            </div>
            {subtitle && (
              <p className="text-[12.5px] text-ink-tertiary truncate mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {headerRight}
          {onMoreClick && (
            <button
              type="button"
              onClick={onMoreClick}
              aria-label="Más opciones"
              className="w-7 h-7 rounded-full bg-[#EAE8E3] hover:bg-[#DFDDD6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 flex items-center justify-center text-ink-secondary press-scale"
            >
              <DotsThree weight="bold" className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Inner White Surface */}
      <div
        className={cn(
          "flex-1 bg-white rounded-[11px] p-4 sm:p-5 shadow-[0_1px_2px_rgba(24,24,27,0.03)] border border-black/[0.03] flex flex-col justify-between",
          innerClassName
        )}
      >
        {children}
      </div>
    </div>
  );
}
