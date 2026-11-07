"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import {
  MagnifyingGlass,
  Users,
  GraduationCap,
  CalendarBlank,
  FileText,
  EnvelopeSimple,
  ChartBar,
  GearSix,
  ArrowRight,
  CheckCircle,
} from "@phosphor-icons/react";

export interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navegación" | "Acciones Rápidas" | "Secciones Activas";
  icon: React.ReactNode;
  shortcut?: string;
  action: () => void;
}

export interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectAction?: (actionLabel: string) => void;
}

export function CommandPalette({
  open,
  onOpenChange,
  onSelectAction,
}: CommandPaletteProps) {
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const items: CommandItem[] = React.useMemo(
    () => [
      {
        id: "action-attendance",
        title: "Registrar asistencia del día",
        subtitle: "Pase de lista rápido por sección — II Trimestre",
        category: "Acciones Rápidas",
        icon: <CheckCircle weight="fill" className="w-4 h-4 text-[#059669]" />,
        shortcut: "A",
        action: () =>
          onSelectAction?.("Pase de lista iniciado para la sección activa"),
      },
      {
        id: "action-grades",
        title: "Publicar calificaciones de I Prueba Parcial",
        subtitle: "Cerrar actas pendientes en Educación Diversificada",
        category: "Acciones Rápidas",
        icon: <FileText weight="fill" className="w-4 h-4 text-[#E07A2E]" />,
        shortcut: "N",
        action: () =>
          onSelectAction?.("Panel de actas de I Prueba Parcial abierto"),
      },
      {
        id: "nav-students",
        title: "Expedientes Estudiantiles (568 activos)",
        subtitle: "Consultar matrícula, encargados legales y condición MEP",
        category: "Navegación",
        icon: <Users weight="regular" className="w-4 h-4 text-[#52504A]" />,
        shortcut: "G E",
        action: () =>
          onSelectAction?.("Vista filtrada: Directorio de Estudiantes"),
      },
      {
        id: "nav-teachers",
        title: "Cuerpo Docente y Carga Académica (30 docentes)",
        subtitle: "Asignación de lecciones, guías y horarios",
        category: "Navegación",
        icon: (
          <GraduationCap weight="regular" className="w-4 h-4 text-[#52504A]" />
        ),
        shortcut: "G D",
        action: () => onSelectAction?.("Vista filtrada: Cuerpo Docente"),
      },
      {
        id: "nav-inbox",
        title: "Centro de Comunicaciones y Circulares",
        subtitle: "Bandeja unificada docentes, estudiantes y encargados",
        category: "Navegación",
        icon: (
          <EnvelopeSimple weight="regular" className="w-4 h-4 text-[#52504A]" />
        ),
        shortcut: "G C",
        action: () =>
          onSelectAction?.("Módulo de Comunicaciones seleccionado"),
      },
      {
        id: "nav-reports",
        title: "Analítica y Reportes Institucionales",
        subtitle: "Exportar actas en PDF/CSV y curva de rendimiento",
        category: "Navegación",
        icon: <ChartBar weight="regular" className="w-4 h-4 text-[#52504A]" />,
        shortcut: "G R",
        action: () =>
          onSelectAction?.("Generador de reportes institucionales activo"),
      },
      {
        id: "sec-10a",
        title: "Sección 10-1 • Educación Diversificada",
        subtitle: "24 estudiantes • Prof. Guía: M.Sc. Valeria Mora",
        category: "Secciones Activas",
        icon: (
          <CalendarBlank weight="fill" className="w-4 h-4 text-[#2563EB]" />
        ),
        action: () => onSelectAction?.("Sección 10-1 cargada en el panel"),
      },
      {
        id: "sec-11b",
        title: "Sección 11-2 • Bachillerato Internacional",
        subtitle: "21 estudiantes • Prof. Guía: Lic. Roberto Jiménez",
        category: "Secciones Activas",
        icon: <GearSix weight="fill" className="w-4 h-4 text-[#7C3AED]" />,
        action: () => onSelectAction?.("Sección 11-2 cargada en el panel"),
      },
    ],
    [onSelectAction]
  );

  const filtered = React.useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.subtitle.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q)
    );
  }, [items, query]);

  React.useEffect(() => {
    setSelectedIndex(0);
  }, [query, open]);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 20);
    } else {
      setQuery("");
    }
  }, [open]);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
        return;
      }
      if (!open) return;

      if (e.key === "Escape") {
        e.preventDefault();
        onOpenChange(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length > 0 ? (prev + 1) % filtered.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filtered.length > 0
            ? (prev - 1 + filtered.length) % filtered.length
            : 0
        );
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        filtered[selectedIndex].action();
        onOpenChange(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-4"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Paleta de comandos de NEXUS"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 6 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 32,
              mass: 0.7,
            }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[560px] bg-[#F4F3F0] border border-[#DFDDD6] rounded-2xl p-1.5 shadow-floating"
          >
            <div className="bg-white rounded-[12px] border border-black/[0.04] overflow-hidden">
              {/* Search Input Bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-[#ECEBE7]">
                <MagnifyingGlass
                  weight="bold"
                  className="w-4 h-4 text-[#78756E] shrink-0"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ir a sección, buscar estudiante o ejecutar comando..."
                  className="w-full bg-transparent text-[13.5px] text-[#18181B] placeholder:text-[#A19E95] focus:outline-none"
                />
                <kbd className="px-1.5 py-0.5 text-[10.5px] font-mono bg-[#F4F3F0] text-[#78756E] border border-[#E5E4DF] rounded-md">
                  ESC
                </kbd>
              </div>

              {/* Results List */}
              <div className="max-h-[340px] overflow-y-auto p-1.5 custom-scrollbar">
                {filtered.length === 0 ? (
                  <div className="py-10 text-center text-[13px] text-[#78756E]">
                    No se encontraron resultados para “{query}”
                  </div>
                ) : (
                  filtered.map((item, idx) => {
                    const isSelected = idx === selectedIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onClick={() => {
                          item.action();
                          onOpenChange(false);
                        }}
                        className={cn(
                          "w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors",
                          isSelected ? "bg-[#F4F3F0]" : "bg-transparent"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-white border border-[#E6E4DF] shadow-xs flex items-center justify-center shrink-0">
                            {item.icon}
                          </div>
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium text-[#18181B] truncate">
                              {item.title}
                            </div>
                            <div className="text-[11.5px] text-[#78756E] truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[10.5px] text-[#A19E95] hidden sm:inline">
                            {item.category}
                          </span>
                          {item.shortcut ? (
                            <kbd className="px-1.5 py-0.5 text-[10.5px] font-mono bg-white text-[#52504A] border border-[#E5E4DF] rounded-md shadow-xs">
                              {item.shortcut}
                            </kbd>
                          ) : (
                            <ArrowRight
                              weight="bold"
                              className="w-3.5 h-3.5 text-[#78756E]"
                            />
                          )}
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer Hints */}
              <div className="px-4 py-2 bg-[#FAF9F6] border-t border-[#ECEBE7] flex items-center justify-between text-[11px] text-[#78756E]">
                <div className="flex items-center gap-3">
                  <span>
                    <strong className="font-medium text-[#52504A]">↑↓</strong>{" "}
                    Navegar
                  </span>
                  <span>
                    <strong className="font-medium text-[#52504A]">↵</strong>{" "}
                    Ejecutar
                  </span>
                </div>
                <span>Institución Demo NEXUS • Ciclo 2026</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
