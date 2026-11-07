"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import {
  MagnifyingGlass,
  X,
  Plus,
  GitBranch,
  Users,
  CalendarBlank,
  WarningCircle,
  CheckCircle,
  BookOpenText,
} from "@phosphor-icons/react";

export interface FilterToken {
  id: string;
  field: string;
  operator: string;
  value: string;
}

export interface AvailableFilterOption {
  id: string;
  field: string;
  operator: string;
  value: string;
  iconType: "level" | "status" | "period" | "alert" | "subject" | "group";
}

const DEFAULT_AVAILABLE_FILTERS: AvailableFilterOption[] = [
  {
    id: "nivel-div",
    field: "Ciclo Académico",
    operator: "incluye",
    value: "Educación Diversificada (10°–11°)",
    iconType: "level",
  },
  {
    id: "nivel-iii",
    field: "Ciclo Académico",
    operator: "es",
    value: "III Ciclo (7°–9°)",
    iconType: "level",
  },
  {
    id: "asistencia-alerta",
    field: "Asistencia",
    operator: "menor a",
    value: "88% (Seguimiento)",
    iconType: "alert",
  },
  {
    id: "condicion-regular",
    field: "Condición MEP",
    operator: "es",
    value: "Regular Activo",
    iconType: "status",
  },
  {
    id: "periodo-ii",
    field: "Periodo Lectivo",
    operator: "es",
    value: "II Trimestre 2026",
    iconType: "period",
  },
];

export interface OmnibarFilterProps {
  tokens: FilterToken[];
  onRemoveToken: (id: string) => void;
  onAddToken: (token: FilterToken) => void;
  onClearAll?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  placeholder?: string;
  className?: string;
}

export function OmnibarFilter({
  tokens,
  onRemoveToken,
  onAddToken,
  onClearAll,
  searchQuery,
  onSearchChange,
  placeholder = "Filtrar secciones, evaluaciones o indicadores...",
  className,
}: OmnibarFilterProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [menuSearch, setMenuSearch] = React.useState("");
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const filteredOptions = DEFAULT_AVAILABLE_FILTERS.filter(
    (opt) =>
      !tokens.some((t) => t.id === opt.id) &&
      (opt.field.toLowerCase().includes(menuSearch.toLowerCase()) ||
        opt.value.toLowerCase().includes(menuSearch.toLowerCase()))
  );

  function renderIcon(type: AvailableFilterOption["iconType"]) {
    switch (type) {
      case "level":
        return (
          <GitBranch weight="regular" className="w-3.5 h-3.5 text-[#52504A]" />
        );
      case "status":
        return (
          <CheckCircle weight="fill" className="w-3.5 h-3.5 text-[#059669]" />
        );
      case "period":
        return (
          <CalendarBlank
            weight="regular"
            className="w-3.5 h-3.5 text-[#2563EB]"
          />
        );
      case "alert":
        return (
          <WarningCircle weight="fill" className="w-3.5 h-3.5 text-[#E11D48]" />
        );
      case "subject":
        return (
          <BookOpenText
            weight="regular"
            className="w-3.5 h-3.5 text-[#7C3AED]"
          />
        );
      default:
        return (
          <Users weight="regular" className="w-3.5 h-3.5 text-[#52504A]" />
        );
    }
  }

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="bg-[#FAF9F6] border border-[#E8E7E2] rounded-2xl px-2.5 py-1.5 flex flex-wrap items-center gap-2 focus-within:border-[#D4D2C9] focus-within:bg-white transition-colors">
        {/* Active Indicator Icon (Reference 2 Acme colorful ring badge) */}
        <span
          className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E11D48]/15 via-[#F59E0B]/15 to-[#2563EB]/15 border border-[#E5E4DF] flex items-center justify-center shrink-0"
          aria-hidden="true"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-[#E11D48]" />
        </span>

        {/* Segmented Multi-Part Filter Tokens (Reference 2 exact `[Field | operator | value | ×]` pattern) */}
        <AnimatePresence initial={false}>
          {tokens.map((token) => (
            <motion.div
              key={token.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center bg-[#F1F0EC] border border-[#E4E3DD] rounded-lg overflow-hidden text-[12px] leading-none divide-x divide-[#E4E3DD]"
            >
              <span className="px-2 py-1.5 font-medium text-[#18181B] bg-white/75 flex items-center gap-1.5">
                <Users weight="regular" className="w-3 h-3 text-[#78756E]" />
                {token.field}
              </span>
              <span className="px-2 py-1.5 text-[#78756E] font-mono text-[11px] bg-[#F5F4F0]">
                {token.operator}
              </span>
              <span className="px-2 py-1.5 font-medium text-[#18181B] bg-white/75">
                {token.value}
              </span>
              <button
                type="button"
                onClick={() => onRemoveToken(token.id)}
                aria-label={`Quitar filtro ${token.field}`}
                className="px-1.5 py-1.5 text-[#78756E] hover:text-[#18181B] hover:bg-[#E6E4DF] transition-colors"
              >
                <X weight="bold" className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Inline Search Input */}
        <div className="flex-1 min-w-[160px] flex items-center gap-1.5">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => {
              if (filteredOptions.length > 0 && !searchQuery) {
                setMenuOpen(true);
              }
            }}
            placeholder={placeholder}
            aria-label="Filtrar vista actual"
            className="w-full bg-transparent text-[12.5px] text-[#18181B] placeholder:text-[#A19E95] focus:outline-none py-1"
          />
        </div>

        {/* Add Filter Trigger & Clear */}
        <div className="flex items-center gap-1.5">
          {tokens.length > 0 && onClearAll && (
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11.5px] text-[#78756E] hover:text-[#18181B] px-2 py-1 rounded-md hover:bg-[#EFEEEA] transition-colors"
            >
              Limpiar
            </button>
          )}
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[12px] font-medium bg-white border border-border text-[#52504A] hover:text-[#18181B] hover:border-border-strong shadow-xs press-scale"
          >
            <Plus weight="bold" className="w-3.5 h-3.5" />
            <span>Filtro</span>
          </button>
        </div>
      </div>

      {/* Smooth Origin-Aware Filter Popover Dropdown (Reference 2 floating menu) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            role="dialog"
            aria-label="Seleccionar dimensión de filtro"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.97 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 sm:left-64 top-full mt-1.5 w-72 bg-white border border-[#E5E4DF] rounded-2xl shadow-popover p-1.5 z-40 origin-top-left"
          >
            <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-[#F1F0EC] mb-1">
              <MagnifyingGlass
                weight="regular"
                className="w-3.5 h-3.5 text-[#A19E95] shrink-0"
              />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Buscar criterio..."
                aria-label="Buscar criterio de filtro"
                className="w-full text-[12.5px] text-[#18181B] placeholder:text-[#A19E95] bg-transparent focus:outline-none"
              />
            </div>

            <div className="space-y-0.5 max-h-56 overflow-y-auto custom-scrollbar">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-4 text-center text-[12px] text-[#78756E]">
                  Todos los criterios están activos
                </div>
              ) : (
                filteredOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      onAddToken({
                        id: opt.id,
                        field: opt.field,
                        operator: opt.operator,
                        value: opt.value,
                      });
                      setMenuOpen(false);
                      setMenuSearch("");
                    }}
                    className="w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-left text-[12.5px] hover:bg-[#F4F3F0] transition-colors group"
                  >
                    <span className="flex items-center gap-2 font-medium text-[#18181B]">
                      {renderIcon(opt.iconType)}
                      <span>{opt.field}</span>
                    </span>
                    <span className="text-[11.5px] text-[#78756E] group-hover:text-[#52504A] truncate max-w-[125px]">
                      {opt.value}
                    </span>
                  </button>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
