"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SlotText } from "slot-text/react";

export interface MatrixColumnData {
  month: string;
  shortLabel: string;
  weeks: {
    primary: number; // 0 to 16 blocks (dark charcoal #18181B)
    secondary: number; // 0 to 16 blocks (warm stone #DFDDD6)
    primaryValueLabel: string;
    secondaryValueLabel: string;
    periodLabel: string;
  }[];
}

export interface MatrixHistogramProps {
  totalLabel: string;
  totalValue: string;
  primarySeriesLabel: string;
  secondarySeriesLabel: string;
  periodOptions?: string[];
  activePeriod?: string;
  onPeriodChange?: (period: string) => void;
  data: MatrixColumnData[];
  yAxisLabels?: string[];
  defaultSelectedCol?: number;
}

export function MatrixHistogram({
  totalLabel,
  totalValue,
  primarySeriesLabel,
  secondarySeriesLabel,
  periodOptions = ["Semanal", "Mensual", "Trimestral"],
  activePeriod = "Mensual",
  onPeriodChange,
  data,
  yAxisLabels = ["568", "480", "390", "300", "210", "120", "0"],
  defaultSelectedCol = 21,
}: MatrixHistogramProps) {
  const TOTAL_ROWS = 16;

  // Adapt matrix columns based on selected period mode so segmented control updates data
  const displayedMonths = React.useMemo(() => {
    if (activePeriod === "Semanal") {
      return data.slice(3, 9);
    }
    if (activePeriod === "Trimestral") {
      return data.slice(1, 11);
    }
    return data;
  }, [data, activePeriod]);

  const flatColumns = React.useMemo(() => {
    const cols: {
      colIndex: number;
      monthIndex: number;
      monthShort: string;
      primary: number;
      secondary: number;
      primaryValueLabel: string;
      secondaryValueLabel: string;
      periodLabel: string;
    }[] = [];

    displayedMonths.forEach((m, mIdx) => {
      m.weeks.forEach((w) => {
        // Scale 12-unit mock heights to 16-row square pixel density
        const scaledPrimary = Math.min(11, Math.max(1, Math.round(w.primary * 0.65)));
        const scaledSecondary = Math.min(
          TOTAL_ROWS - scaledPrimary - 1,
          Math.max(1, Math.round((w.secondary + (w.primary % 3)) * 1.35))
        );
        cols.push({
          colIndex: cols.length,
          monthIndex: mIdx,
          monthShort: m.shortLabel,
          primary: scaledPrimary,
          secondary: scaledSecondary,
          primaryValueLabel: w.primaryValueLabel,
          secondaryValueLabel: w.secondaryValueLabel,
          periodLabel: w.periodLabel,
        });
      });
    });
    return cols;
  }, [displayedMonths]);

  const [hoveredCol, setHoveredCol] = React.useState<number>(defaultSelectedCol);

  React.useEffect(() => {
    if (hoveredCol >= flatColumns.length) {
      setHoveredCol(Math.max(0, Math.floor(flatColumns.length / 2)));
    }
  }, [flatColumns.length, hoveredCol]);

  const activeColData = flatColumns[hoveredCol] ?? flatColumns[0];

  const computedTotalValue = React.useMemo(() => {
    if (activePeriod === "Semanal") return "95,2% (541/568)";
    if (activePeriod === "Trimestral") return "94,9% (539/568)";
    return totalValue;
  }, [activePeriod, totalValue]);

  return (
    <div className="space-y-5">
      {/* Top Control Row inside White Surface (Reference 1 Spark Pixel exact layout) */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-baseline gap-2.5">
          <span className="text-[12.5px] text-[#78756E]">{totalLabel} :</span>
          <SlotText
            text={computedTotalValue}
            options={{
              duration: 380,
              stagger: 22,
              bounce: 0.35,
              direction: "up",
            }}
            className="font-mono text-[21px] sm:text-[23px] font-bold tracking-[-0.04em] text-[#18181B] tabular-nums"
          />
        </div>

        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Technical Monospace Series Legend (exact Reference 1 detail) */}
          <div className="flex items-center gap-4 font-mono text-[10.5px] font-medium tracking-[0.06em] uppercase text-[#6E6B64]">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8D6CE]" />
              {secondarySeriesLabel}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
              {primarySeriesLabel}
            </span>
          </div>

          {/* Segmented Period Toggle */}
          <div
            role="tablist"
            aria-label="Periodo de visualización"
            className="bg-[#F3F2EE] p-1 rounded-xl flex items-center gap-0.5 border border-[#E9E8E3]"
          >
            {periodOptions.map((option) => {
              const isSelected = option === activePeriod;
              return (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => onPeriodChange?.(option)}
                  className={cn(
                    "px-3 py-1 rounded-lg text-[12px] font-medium transition-all duration-150 press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                    isSelected
                      ? "bg-white text-[#18181B] shadow-xs"
                      : "text-[#78756E] hover:text-[#18181B]"
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Square Pixel Matrix Grid + Y-Axis with Tick Dots + Floating Popover */}
      <div className="relative pt-1 select-none">
        <div className="flex items-stretch gap-2.5">
          {/* Y-Axis Labels with Reference 1 Line+Dot Ticks (`568 —•`) */}
          <div className="flex flex-col justify-between text-[11px] text-[#A19E95] tabular-nums pr-0.5 py-1 shrink-0 pb-7">
            {yAxisLabels.map((label) => (
              <div
                key={label}
                className="flex items-center justify-end gap-1.5 leading-none"
              >
                <span className="text-right font-normal">{label}</span>
                <span className="flex items-center">
                  <span className="w-2 h-[1px] bg-[#E5E4DF]" />
                  <span className="w-1 h-1 rounded-full bg-[#D0CEC7]" />
                </span>
              </div>
            ))}
          </div>

          {/* Dense Square Pixel Matrix (16 rows x N cols) */}
          <div className="relative flex-1 min-w-0 overflow-x-auto custom-scrollbar pb-1">
            <div className="relative min-w-[580px]">
              {/* Subtle Horizontal Reference Lines behind the matrix */}
              <div
                className="absolute inset-x-0 top-1 bottom-7 flex flex-col justify-between pointer-events-none z-0"
                aria-hidden="true"
              >
                {yAxisLabels.map((label) => (
                  <div
                    key={label}
                    className="w-full border-t border-dashed border-[#F0EFEA]"
                  />
                ))}
              </div>

              <div
                className="relative z-10 grid gap-[2.5px]"
                style={{
                  gridTemplateColumns: `repeat(${flatColumns.length}, minmax(0, 1fr))`,
                }}
              >
                {flatColumns.map((col) => {
                  const isHovered = col.colIndex === hoveredCol;
                  return (
                    <div
                      key={col.colIndex}
                      tabIndex={0}
                      role="button"
                      aria-label={`${col.periodLabel}: ${col.primaryValueLabel} asistencia regular, ${col.secondaryValueLabel} justificadas`}
                      onMouseEnter={() => setHoveredCol(col.colIndex)}
                      onFocus={() => setHoveredCol(col.colIndex)}
                      onClick={() => setHoveredCol(col.colIndex)}
                      className="relative flex flex-col gap-[2.5px] cursor-pointer group py-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 rounded-sm"
                    >
                      {/* Vertical Dashed Indicator Line on Active Column */}
                      {isHovered && (
                        <div
                          className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-l border-dashed border-[#8C8980] pointer-events-none z-20"
                          aria-hidden="true"
                        />
                      )}

                      {Array.from({ length: TOTAL_ROWS }).map((_, rIdx) => {
                        const rowFromBottom = TOTAL_ROWS - 1 - rIdx;
                        const isPrimary = rowFromBottom < col.primary;
                        const isSecondary =
                          !isPrimary &&
                          rowFromBottom < col.primary + col.secondary;

                        const isTopMarker =
                          isHovered &&
                          rowFromBottom === col.primary + col.secondary - 1;

                        return (
                          <div
                            key={rIdx}
                            className={cn(
                              "h-[9.5px] w-full rounded-[1.5px] transition-colors duration-150 relative",
                              isPrimary
                                ? "bg-[#18181B]"
                                : isSecondary
                                ? "bg-[#E2E0D8]"
                                : "bg-[#F6F5F2] group-hover:bg-[#EFECE6]"
                            )}
                          >
                            {isTopMarker && (
                              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-[#18181B] ring-2 ring-white shadow-sm z-30" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Floating Tooltip Card (Reference 1 Spark Pixel exact style + SlotText) */}
              {activeColData && (
                <div
                  className="hidden sm:block absolute top-4 z-30 pointer-events-none transition-all duration-150 ease-out"
                  style={{
                    left: `${Math.min(
                      Math.max((hoveredCol / flatColumns.length) * 100, 6),
                      68
                    )}%`,
                  }}
                >
                  <div className="bg-white/95 backdrop-blur-sm border border-[#E6E4DF] rounded-xl p-1.5 shadow-popover min-w-[184px]">
                    <div className="bg-[#F4F3F0] rounded-lg px-2.5 py-1 text-[11.5px] font-medium text-[#6E6B64] mb-1.5">
                      {activeColData.periodLabel}
                    </div>
                    <div className="px-2 py-1 space-y-1 text-[11.5px] tabular-nums">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5 text-[#78756E]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D8D6CE]" />
                          Justificadas
                        </span>
                        <SlotText
                          text={activeColData.secondaryValueLabel}
                          options={{ duration: 240, stagger: 16, bounce: 0.25 }}
                          className="font-mono font-semibold text-[#18181B]"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-1.5 text-[#78756E]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
                          Asistencia
                        </span>
                        <SlotText
                          text={activeColData.primaryValueLabel}
                          options={{ duration: 240, stagger: 16, bounce: 0.25 }}
                          className="font-mono font-semibold text-[#18181B]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* X-Axis Month Labels with Reference 1 Centered Dots (`ENE  •  FEB  •  MAR`) */}
              <div className="flex items-center justify-between pt-3 px-1 text-[10.5px] font-medium tracking-[0.06em] uppercase">
                {displayedMonths.map((m, idx) => {
                  const isActiveMonth = activeColData?.monthIndex === idx;
                  return (
                    <React.Fragment key={m.month}>
                      <span
                        className={cn(
                          "transition-colors",
                          isActiveMonth
                            ? "text-[#18181B] font-bold"
                            : "text-[#A19E95]"
                        )}
                      >
                        {m.shortLabel}
                      </span>
                      {idx < displayedMonths.length - 1 && (
                        <span
                          className="w-1 h-1 rounded-full bg-[#D8D6CF]"
                          aria-hidden="true"
                        />
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
