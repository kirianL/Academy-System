"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SlotText } from "slot-text/react";
import {
  TrendUp,
  Files,
  Clock,
  DotsThree,
  CurrencyCircleDollar,
  CalendarBlank,
  ChatCircleText,
  Sparkle,
} from "@phosphor-icons/react";

/**
 * Reference 2 (Acme Development Pipeline):
 * Fraction Counter + 16-Bar Vertical Micro-Pill Progress Strip
 */
export interface SegmentedPillProgressProps {
  current: number;
  total: number;
  delta?: string;
  segments?: number;
  activeColor?: string;
  className?: string;
}

export function SegmentedPillProgress({
  current,
  total,
  delta,
  segments = 16,
  activeColor = "#E07A2E",
  className,
}: SegmentedPillProgressProps) {
  const ratio = total > 0 ? Math.min(1, Math.max(0, current / total)) : 0;
  const filledSegments = Math.round(ratio * segments);

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-baseline gap-2.5 tabular-nums">
        <SlotText
          text={`${current}/${total}`}
          options={{ duration: 320, stagger: 24, bounce: 0.35 }}
          className="font-mono text-[18px] font-bold tracking-[-0.03em] text-ink-primary"
        />
        {delta && (
          <span className="inline-flex items-center gap-1 text-[12px] font-medium text-[#059669]">
            <TrendUp weight="bold" className="w-3.5 h-3.5" />
            <SlotText
              text={delta}
              options={{ duration: 280, stagger: 18, bounce: 0.25 }}
            />
          </span>
        )}
      </div>

      <div
        className="flex items-center gap-[3.5px]"
        role="progressbar"
        aria-valuenow={current}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        {Array.from({ length: segments }).map((_, idx) => {
          const isFilled = idx < filledSegments;
          return (
            <span
              key={idx}
              className="w-[3.5px] h-[14px] rounded-full transition-colors duration-200"
              style={{
                backgroundColor: isFilled ? activeColor : "#EAE9E4",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/**
 * Reference 3 (Readability 85 / Action Scale):
 * Academic Health Score + Interactive 10-Capsule Action Scale with Vertical Needle
 */
export interface ActionScaleProps {
  scoreTitle: string;
  scoreValue: string;
  scoreSubtitle: string;
  scaleTitle: string;
  activeSegmentIndex?: number; // 0 to 9
  onSegmentChange?: (index: number) => void;
  labels?: [string, string, string];
  className?: string;
}

const CAPSULE_COLORS = [
  "#FADCE2", // 0: Soft rose
  "#FCE2D5", // 1: Soft peach
  "#F59E0B", // 2: Vibrant amber
  "#E5F2EE", // 3: Pale sage
  "#D4ECE4", // 4: Soft mint
  "#BEE3D6", // 5: Mint
  "#D4ECE4", // 6: Soft mint
  "#E5F2EE", // 7: Pale sage
  "#FCE8D5", // 8: Warm sand
  "#FADCE2", // 9: Soft rose
];

export function ActionScale({
  scoreTitle,
  scoreValue,
  scoreSubtitle,
  scaleTitle,
  activeSegmentIndex = 2,
  onSegmentChange,
  labels = ["Baja", "Equilibrada", "Sobrecarga"],
  className,
}: ActionScaleProps) {
  const [selectedIdx, setSelectedIdx] = React.useState(activeSegmentIndex);

  React.useEffect(() => {
    setSelectedIdx(activeSegmentIndex);
  }, [activeSegmentIndex]);

  const dynamicScore = React.useMemo(() => {
    if (selectedIdx === activeSegmentIndex) return scoreValue;
    const simulatedScores = [
      "78,2%",
      "84,5%",
      "91,4%",
      "93,8%",
      "95,1%",
      "94,6%",
      "92,9%",
      "89,4%",
      "83,7%",
      "76,5%",
    ];
    return simulatedScores[selectedIdx] ?? scoreValue;
  }, [selectedIdx, activeSegmentIndex, scoreValue]);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Primary Score Block (Exact Reference 3 Readability 85 Typography) */}
      <div className="pb-3.5 border-b border-[#ECEBE7]">
        <div className="text-[13.5px] font-semibold text-[#18181B] mb-1">
          {scoreTitle}
        </div>
        <SlotText
          text={dynamicScore}
          options={{ duration: 360, stagger: 26, bounce: 0.4 }}
          className="font-mono text-[28px] font-bold tracking-[-0.04em] text-[#16A34A] tabular-nums leading-none"
        />
        <p className="text-[12.5px] text-[#78756E] mt-1.5">{scoreSubtitle}</p>
      </div>

      {/* 10-Capsule Scale with Vertical Indicator Needle */}
      <div>
        <div className="text-[13.5px] font-semibold text-[#18181B] mb-2.5">
          {scaleTitle}
        </div>

        <div className="relative grid grid-cols-10 gap-1.5 py-1.5 items-center">
          {CAPSULE_COLORS.map((color, idx) => {
            const isSelected = idx === selectedIdx;
            return (
              <button
                key={idx}
                type="button"
                aria-label={`Nivel de carga ${idx + 1} de 10`}
                onClick={() => {
                  setSelectedIdx(idx);
                  onSegmentChange?.(idx);
                }}
                className="relative flex items-center justify-center focus-visible:outline-none group"
              >
                <div
                  className={cn(
                    "h-[18px] w-full rounded-[6px] transition-all duration-200",
                    isSelected
                      ? "scale-y-105 shadow-xs"
                      : "hover:opacity-85"
                  )}
                  style={{
                    backgroundColor: isSelected ? "#F59E0B" : color,
                  }}
                />
                {isSelected && (
                  <span
                    className="absolute -top-1.5 -bottom-1.5 w-[2px] bg-[#18181B] rounded-full z-10 shadow-xs transition-transform duration-200"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between text-[11.5px] text-[#78756E] mt-1.5">
          <span>{labels[0]}</span>
          <span>{labels[1]}</span>
          <span>{labels[2]}</span>
        </div>
      </div>
    </div>
  );
}

/**
 * Reference 2 (Acme Development Pipeline):
 * Workstream / Academic Item Card with Recessed Metadata Box
 */
export interface AcademicWorkCardProps {
  icon: React.ReactNode;
  iconBg?: string;
  title: string;
  code: string;
  metadata: {
    icon: React.ReactNode;
    label: string;
    value: string;
  }[];
  itemCount: number;
  timeAgo: string;
  onClick?: () => void;
}

export function AcademicWorkCard({
  icon,
  iconBg = "#E07A2E",
  title,
  code,
  metadata,
  itemCount,
  timeAgo,
  onClick,
}: AcademicWorkCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-[#EAE9E4] rounded-2xl p-4 shadow-[0_1px_2px_rgba(24,24,27,0.025)] hover-lift flex flex-col justify-between",
        onClick && "cursor-pointer press-scale"
      )}
    >
      <div>
        {/* Badge Icon */}
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-white mb-3 shadow-xs"
          style={{ backgroundColor: iconBg }}
        >
          {icon}
        </div>

        {/* Title & Code */}
        <h4 className="text-[14px] font-semibold text-ink-primary tracking-[-0.01em] leading-snug line-clamp-1">
          {title}
        </h4>
        <div className="text-[12px] text-[#8C8980] font-mono mt-0.5 mb-3">
          {code}
        </div>

        {/* Recessed Metadata Grid (Exact Reference 2 Pattern) */}
        <div className="bg-[#F7F6F3] rounded-xl p-3 space-y-2 border border-[#EFEEEA]">
          {metadata.map((row, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between gap-2 text-[12px]"
            >
              <span className="flex items-center gap-1.5 text-[#78756E] shrink-0">
                {row.icon}
                <span>{row.label}</span>
              </span>
              <span className="font-medium text-ink-primary truncate text-right">
                {row.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="pt-3 flex items-center gap-3.5 text-[11.5px] text-[#78756E] tabular-nums">
        <span className="inline-flex items-center gap-1">
          <Files weight="regular" className="w-3.5 h-3.5 text-[#A19E95]" />
          <SlotText
            text={String(itemCount)}
            options={{ duration: 260, stagger: 20 }}
          />
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock weight="regular" className="w-3.5 h-3.5 text-[#A19E95]" />
          {timeAgo}
        </span>
      </div>
    </div>
  );
}

/**
 * Reference 4 (Mantra Projects — Baranov / IT Crowd card pattern):
 * Rich Visual Preview Card with Header Avatar, Active Badge, Editorial Split Banner,
 * Outlined Pill Tags, and Icon Metadata Footer with Notification Dot.
 */
export interface AcademicProjectCardProps {
  department: string;
  dateLabel: string;
  statusLabel: string;
  statusTone?: "active" | "negotiating" | "archived";
  title: string;
  tags: string[];
  platformLabel: string;
  budgetRangeCRC: string;
  dueDateLabel: string;
  messagesLabel: string;
  unreadMessages?: boolean;
  bannerVariant: "stem" | "bachillerato" | "becas";
  onClick?: () => void;
}

export function AcademicProjectCard({
  department,
  dateLabel,
  statusLabel,
  statusTone = "active",
  title,
  tags,
  platformLabel,
  budgetRangeCRC,
  dueDateLabel,
  messagesLabel,
  unreadMessages = true,
  bannerVariant,
  onClick,
}: AcademicProjectCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "bg-white border border-[#ECEBE6] rounded-[22px] p-4 shadow-[0_2px_10px_rgba(24,24,27,0.03)] hover-lift flex flex-col justify-between transition-all",
        onClick && "cursor-pointer press-scale"
      )}
    >
      <div>
        {/* Card Header: Circular Emblem + Department/Date + Active Pill + Dots */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#18181B] text-white flex items-center justify-center shrink-0 shadow-xs font-mono text-[11px] font-bold tracking-tighter">
              {department.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-[#18181B] truncate leading-tight">
                {department}
              </div>
              <div className="text-[11.5px] text-[#8C8980] truncate leading-tight mt-0.5">
                {dateLabel}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={cn(
                "px-2.5 py-1 rounded-full text-[11.5px] font-semibold leading-none",
                statusTone === "active"
                  ? "bg-[#E7F8EE] text-[#16A34A]"
                  : statusTone === "negotiating"
                  ? "bg-[#FEF5E7] text-[#D97706]"
                  : "bg-[#F3F2EE] text-[#6E6B64]"
              )}
            >
              {statusLabel}
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClick?.();
              }}
              aria-label="Opciones del programa"
              className="w-7 h-7 rounded-full hover:bg-[#F4F3F0] flex items-center justify-center text-[#78756E] hover:text-[#18181B] transition-colors"
            >
              <DotsThree weight="bold" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visual Preview Banner (Exact Reference 4 Mantra Split-Canvas Preview) */}
        <div className="h-[138px] w-full rounded-2xl overflow-hidden border border-black/[0.05] mb-3.5 relative select-none">
          {bannerVariant === "stem" && (
            <div className="w-full h-full grid grid-cols-12 bg-[#EAE3D5]">
              {/* Left Editorial Copy Pane (Baranov style) */}
              <div className="col-span-6 p-3.5 flex flex-col justify-between bg-[#EFE9DE]">
                <div className="text-[8.5px] font-mono uppercase tracking-wider text-[#78756E]">
                  NEXUS • LAB 2026
                </div>
                <div className="text-[11px] font-medium leading-tight text-[#23201E]">
                   Articulación científica entre{" "}
                  <span className="text-[#D97706] font-semibold">
                    laboratorios
                  </span>{" "}
                  y{" "}
                  <span className="text-[#059669] font-semibold">
                    docentes guía
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 bg-[#18181B] text-white text-[8px] px-2 py-0.5 rounded-full w-fit">
                  <span>Ver Rúbrica</span>
                </div>
              </div>
              {/* Right Atmospheric Sky & Floating Cards Pane */}
              <div className="col-span-6 relative bg-gradient-to-b from-[#7DD3FC] via-[#BAE6FD] to-[#A7F3D0] p-2.5 flex items-center justify-center overflow-hidden">
                <div className="w-24 h-16 rounded-xl bg-white/95 shadow-md border border-white p-2 rotate-[-4deg] flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="w-2 h-2 rounded-full bg-[#10B981]" />
                    <span className="font-mono text-[8px] font-bold text-[#18181B]">
                      96,4%
                    </span>
                  </div>
                  <div className="text-[8px] font-semibold text-[#18181B] leading-tight">
                    Feria Científica Nacional
                  </div>
                  <div className="h-1 w-full bg-[#E5E4DF] rounded-full overflow-hidden">
                    <div className="h-full w-4/5 bg-[#10B981]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {bannerVariant === "bachillerato" && (
            <div className="w-full h-full bg-[#F4F3F0] p-3 flex flex-col justify-between relative overflow-hidden">
              {/* Top Mini Browser Bar (IT Crowd style) */}
              <div className="flex items-center justify-between text-[8px] text-[#78756E] border-b border-[#E5E4DF] pb-1.5">
                <span className="font-bold text-[#18181B]">● SIRIME MEP</span>
                <span>Convocatoria 2026</span>
              </div>
              <div className="grid grid-cols-12 gap-2 items-end pt-1">
                <div className="col-span-7 space-y-1">
                  <div className="text-[11.5px] font-bold text-[#18181B] leading-tight">
                    Pruebas Nacionales Estandarizadas
                  </div>
                  <div className="text-[8.5px] text-[#78756E]">
                    210 estudiantes • 11° Nivel
                  </div>
                </div>
                <div className="col-span-5 h-16 rounded-xl bg-gradient-to-br from-[#F97316] to-[#DC2626] p-2 text-white shadow-sm flex flex-col justify-between">
                  <span className="text-[7.5px] uppercase tracking-wider opacity-90">
                    Avance
                  </span>
                  <span className="font-mono text-[13px] font-bold leading-none">
                    94,2%
                  </span>
                </div>
              </div>
            </div>
          )}

          {bannerVariant === "becas" && (
            <div className="w-full h-full grid grid-cols-12 bg-[#F3EFE6]">
              <div className="col-span-7 p-3.5 flex flex-col justify-between">
                <span className="text-[8px] font-mono uppercase tracking-wider text-[#059669] bg-[#E7F8EE] px-1.5 py-0.5 rounded w-fit font-semibold">
                  FONDO PANEA • IMAS
                </span>
                <div className="text-[11.5px] font-bold text-[#18181B] leading-tight">
                  Ejecución Presupuestaria y Comedor Estudiantil
                </div>
                <div className="font-mono text-[9.5px] text-[#52504A]">
                  142 beneficiarios activos
                </div>
              </div>
              <div className="col-span-5 bg-gradient-to-br from-[#18181B] to-[#3F3F46] p-3 text-white flex flex-col justify-between">
                <span className="text-[8px] text-zinc-400 font-mono">
                  ASIGNADO
                </span>
                <div className="font-mono text-[13px] font-bold text-[#34D399]">
                  ₡18,45M
                </div>
                <span className="text-[8px] text-zinc-300">
                  Auditoría al día
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Bold Project Title (Mantra Typography) */}
        <h4 className="text-[16.5px] font-bold tracking-[-0.02em] text-[#18181B] leading-snug mb-3 line-clamp-2">
          {title}
        </h4>

        {/* Outlined Pill Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full border border-[#E6E5E0] bg-white text-[11.5px] font-medium text-[#52504A]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Icon + Value Metadata Stack (Exact Reference 4 Mantra Footer) */}
      <div className="pt-3 border-t border-[#F2F1ED] space-y-2 text-[12.5px] text-[#52504A]">
        <div className="flex items-center gap-2">
          <Sparkle weight="fill" className="w-4 h-4 text-[#7C3AED] shrink-0" />
          <span className="truncate font-medium text-[#18181B]">
            {platformLabel}
          </span>
        </div>
        <div className="flex items-center gap-2 tabular-nums">
          <CurrencyCircleDollar
            weight="regular"
            className="w-4 h-4 text-[#78756E] shrink-0"
          />
          <SlotText
            text={budgetRangeCRC}
            options={{ duration: 320, stagger: 20 }}
            className="font-mono text-[12px] text-[#3F3D38]"
          />
        </div>
        <div className="flex items-center gap-2">
          <CalendarBlank
            weight="regular"
            className="w-4 h-4 text-[#78756E] shrink-0"
          />
          <span className="truncate">{dueDateLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative inline-flex items-center justify-center shrink-0">
            <ChatCircleText
              weight="regular"
              className="w-4 h-4 text-[#78756E]"
            />
            {unreadMessages && (
              <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#EF4444] ring-1 ring-white" />
            )}
          </span>
          <span className="truncate font-medium text-[#3F3D38]">
            {messagesLabel}
          </span>
        </div>
      </div>
    </div>
  );
}
