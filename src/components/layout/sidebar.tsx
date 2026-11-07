"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { SlotText } from "slot-text/react";
import { AnimatePresence, motion } from "motion/react";
import { NexusAvatar } from "@/components/ui/nexus-avatar";
import { useProfileStore } from "@/lib/profile-store";
import {
  House,
  Users,
  GraduationCap,
  FolderOpen,
  Folder,
  CalendarCheck,
  FileText,
  CalendarBlank,
  EnvelopeSimple,
  ChartBar,
  GearSix,
  CaretUpDown,
  CaretDown,
  CheckCircle,
  ClockCountdown,
  Record,
  SidebarSimple,
  X,
  Buildings,
  Sparkle,
  UserCircle,
} from "@phosphor-icons/react";

export interface NavItem {
  id: string;
  label: string;
  renderIcon: (active: boolean) => React.ReactNode;
  badge?: string;
  section: "main" | "academic" | "management";
}

export interface SidebarProps {
  activeNav: string;
  onSelectNav: (id: string, label: string) => void;
  activeCycle: string;
  onCycleChange: (cycle: string) => void;
  activeCampus?: string;
  onCampusChange?: (campus: string) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const CYCLES = [
  "II Trimestre • Ciclo 2026",
  "I Trimestre • Ciclo 2026",
  "III Trimestre • Ciclo 2025",
];

const CAMPUSES = [
  "Institución Demo NEXUS",
  "NEXUS • Campus Técnico",
];

export function Sidebar({
  activeNav,
  onSelectNav,
  activeCycle,
  onCycleChange,
  activeCampus = "Institución Demo NEXUS",
  onCampusChange,
  mobileOpen,
  onCloseMobile,
  collapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const [switcherOpen, setSwitcherOpen] = React.useState(false);
  const [starredExpanded, setStarredExpanded] = React.useState(true);
  const [levelsExpanded, setLevelsExpanded] = React.useState(true);
  const { myProfile } = useProfileStore();

  const isTechCampus = activeCampus.includes("Técnico");

  const mainMenu: NavItem[] = [
    {
      id: "dashboard",
      label: "Panel Principal",
      renderIcon: (active) => (
        <House weight={active ? "fill" : "regular"} className="w-4 h-4" />
      ),
      section: "main",
    },
    {
      id: "estudiantes",
      label: "Estudiantes",
      renderIcon: (active) => (
        <Users weight={active ? "fill" : "regular"} className="w-4 h-4" />
      ),
      badge: isTechCampus ? "312" : "568",
      section: "main",
    },
    {
      id: "docentes",
      label: "Cuerpo Docente",
      renderIcon: (active) => (
        <GraduationCap
          weight={active ? "fill" : "regular"}
          className="w-4 h-4"
        />
      ),
      badge: isTechCampus ? "18" : "30",
      section: "main",
    },
    {
      id: "secciones",
      label: "Proyectos y Secciones",
      renderIcon: (active) => (
        <FolderOpen weight={active ? "fill" : "regular"} className="w-4 h-4" />
      ),
      badge: isTechCampus ? "16" : "29",
      section: "main",
    },
    {
      id: "comunicaciones",
      label: "Comunicaciones",
      renderIcon: (active) => (
        <EnvelopeSimple
          weight={active ? "fill" : "regular"}
          className="w-4 h-4"
        />
      ),
      badge: "4",
      section: "main",
    },
    {
      id: "archivos",
      label: "Archivo Institucional",
      renderIcon: (active) => (
        <Folder
          weight={active ? "fill" : "regular"}
          className="w-4 h-4"
        />
      ),
      badge: "68",
      section: "main",
    },
    {
      id: "perfil",
      label: "Mi Perfil",
      renderIcon: (active) => (
        <UserCircle
          weight={active ? "fill" : "regular"}
          className="w-4 h-4"
        />
      ),
      section: "main",
    },
  ];

  const academicMenu: NavItem[] = [
    {
      id: "asistencia",
      label: "Control de Asistencia",
      renderIcon: (active) => (
        <CalendarCheck
          weight={active ? "fill" : "regular"}
          className="w-4 h-4"
        />
      ),
      section: "academic",
    },
    {
      id: "calificaciones",
      label: "Calificaciones y Actas",
      renderIcon: (active) => (
        <FileText weight={active ? "fill" : "regular"} className="w-4 h-4" />
      ),
      section: "academic",
    },
    {
      id: "horarios",
      label: "Horarios y Calendario",
      renderIcon: (active) => (
        <CalendarBlank
          weight={active ? "fill" : "regular"}
          className="w-4 h-4"
        />
      ),
      section: "academic",
    },
    {
      id: "reportes",
      label: "Reportes y Analítica",
      renderIcon: (active) => (
        <ChartBar weight={active ? "fill" : "regular"} className="w-4 h-4" />
      ),
      section: "academic",
    },
    {
      id: "configuracion",
      label: "Administración",
      renderIcon: (active) => (
        <GearSix weight={active ? "fill" : "regular"} className="w-4 h-4" />
      ),
      section: "management",
    },
  ];

  const pinnedItems = [
    {
      id: "pin-actas-10",
      label: "Cierre de Actas • 10° Nivel",
      status: "amber" as const,
    },
    {
      id: "pin-asistencia-7",
      label: "Alerta Asistencia • Sección 7-2",
      status: "dark" as const,
    },
    {
      id: "pin-becas",
      label: "Comité de Becas y Comedor",
      status: "emerald" as const,
    },
  ];

  const sidebarContent = (
    <aside
      aria-label="Navegación institucional"
      className={cn(
        "h-full flex flex-col justify-between bg-[#F6F5F2] border-r border-[#E8E7E2] select-none transition-all duration-200",
        collapsed ? "w-[72px]" : "w-[264px]"
      )}
    >
      {/* Top Zone: Institution Switcher + Main Navigation */}
      <div className="p-3 space-y-4 overflow-y-auto custom-scrollbar flex-1">
        {/* Institution Switcher Card (Reference 1 Spark Pixel Team + Reference 4 Mantra) */}
        <div className="relative">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-expanded={switcherOpen}
              aria-label="Cambiar institución o periodo lectivo"
              onClick={() => setSwitcherOpen((prev) => !prev)}
              className={cn(
                "flex-1 min-w-0 bg-[#EDEBE6] hover:bg-[#E5E3DC] border border-[#E2E0D8] rounded-2xl p-2 flex items-center justify-between gap-2 text-left transition-colors press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                collapsed && "justify-center p-2"
              )}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-[#18181B] text-white flex items-center justify-center shrink-0 shadow-xs font-mono font-bold text-[12px] tracking-tighter">
                  NX
                </div>
                {!collapsed && (
                  <div className="min-w-0">
                    <div className="text-[10.5px] font-medium text-[#78756E] leading-none mb-1 truncate">
                      {activeCycle}
                    </div>
                    <div className="text-[13px] font-semibold text-[#18181B] truncate leading-tight">
                      {activeCampus}
                    </div>
                  </div>
                )}
              </div>
              {!collapsed && (
                <CaretUpDown
                  weight="bold"
                  className="w-3.5 h-3.5 text-[#78756E] shrink-0"
                />
              )}
            </button>

            {/* Collapse Sidebar Button on Desktop / Close on Mobile */}
            {mobileOpen ? (
              <button
                type="button"
                onClick={onCloseMobile}
                aria-label="Cerrar menú lateral"
                className="lg:hidden w-8 h-8 rounded-xl bg-white border border-border flex items-center justify-center text-ink-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
              >
                <X weight="bold" className="w-4 h-4" />
              </button>
            ) : (
              onToggleCollapse &&
              !collapsed && (
                <button
                  type="button"
                  onClick={onToggleCollapse}
                  aria-label="Contraer barra lateral"
                  className="hidden lg:flex w-7 h-7 rounded-lg hover:bg-[#EAE8E2] items-center justify-center text-[#78756E] hover:text-[#18181B] shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                >
                  <SidebarSimple weight="regular" className="w-4 h-4" />
                </button>
              )
            )}
          </div>

          {/* Smooth Multi-Institution & Academic Cycle Dropdown */}
          <AnimatePresence>
            {switcherOpen && !collapsed && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-0 right-0 top-full mt-1.5 bg-white border border-[#E5E4DF] rounded-2xl shadow-popover p-1.5 z-30 space-y-1.5 origin-top"
              >
                <div>
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A19E95]">
                    Recinto Institucional
                  </div>
                  {CAMPUSES.map((campus) => (
                    <button
                      key={campus}
                      type="button"
                      onClick={() => {
                        onCampusChange?.(campus);
                        setSwitcherOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[12px] text-left transition-colors",
                        campus === activeCampus
                          ? "bg-[#F4F3F0] font-semibold text-[#18181B]"
                          : "text-[#52504A] hover:bg-[#FAF9F6]"
                      )}
                    >
                      <span className="flex items-center gap-2 truncate">
                        <Buildings
                          weight={campus === activeCampus ? "fill" : "regular"}
                          className="w-3.5 h-3.5 text-[#78756E] shrink-0"
                        />
                        <span className="truncate">{campus}</span>
                      </span>
                      {campus === activeCampus && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#18181B]" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="border-t border-[#F1F0EC] pt-1">
                  <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#A19E95]">
                    Periodo Lectivo Activo
                  </div>
                  {CYCLES.map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => {
                        onCycleChange(cycle);
                        setSwitcherOpen(false);
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-[12px] text-left transition-colors",
                        cycle === activeCycle
                          ? "bg-[#F4F3F0] font-semibold text-[#18181B]"
                          : "text-[#52504A] hover:bg-[#FAF9F6]"
                      )}
                    >
                      <span>{cycle}</span>
                      {cycle === activeCycle && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Section 1: Menú Principal */}
        <div>
          {!collapsed && (
            <div className="px-2.5 mb-1.5 text-[11px] font-medium text-[#78756E]">
              Menú Principal
            </div>
          )}
          <nav className="space-y-0.5">
            {mainMenu.map((item) => {
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectNav(item.id, item.label);
                    onCloseMobile();
                  }}
                  title={collapsed ? item.label : undefined}
                  aria-label={collapsed ? item.label : undefined}
                  className={cn(
                    "w-full flex items-center justify-between gap-2.5 px-2.5 py-2 rounded-xl text-[13px] transition-all duration-150 press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                    isActive
                      ? "bg-white text-[#18181B] font-semibold shadow-xs border border-[#E6E5E0]"
                      : "text-[#52504A] hover:bg-[#ECEAE4] hover:text-[#18181B] border border-transparent",
                    collapsed && "justify-center px-0"
                  )}
                >
                  <span className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive ? "text-[#18181B]" : "text-[#78756E]"
                      )}
                    >
                      {item.renderIcon(isActive)}
                    </span>
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </span>

                  {!collapsed && item.badge && (
                    <span
                      className={cn(
                        "px-1.5 py-0.5 text-[11px] rounded-md font-mono tabular-nums font-medium",
                        item.id === "comunicaciones"
                          ? "bg-[#23201E] text-white"
                          : isActive
                          ? "bg-[#F4F3F0] text-[#52504A]"
                          : "text-[#78756E]"
                      )}
                    >
                      <SlotText
                        text={item.badge}
                        options={{ duration: 280, stagger: 20 }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Section 2: Accesos Fijados (Reference 2 Acme Starred pattern) */}
        {!collapsed && (
          <div className="pt-2 border-t border-[#EAE9E4]">
            <button
              type="button"
              onClick={() => setStarredExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-2.5 mb-1.5 text-[11px] font-medium text-[#78756E] hover:text-[#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md"
            >
              <span>Seguimiento Prioritario</span>
              <CaretDown
                weight="bold"
                className={cn(
                  "w-3 h-3 transition-transform duration-150",
                  !starredExpanded && "-rotate-90"
                )}
              />
            </button>

            {starredExpanded && (
              <div className="space-y-1">
                {pinnedItems.map((pin) => {
                  const isActive = activeNav === pin.id;
                  return (
                    <button
                      key={pin.id}
                      type="button"
                      onClick={() => {
                        onSelectNav(pin.id, pin.label);
                        onCloseMobile();
                      }}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-[12.5px] text-left transition-colors press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                        isActive
                          ? "bg-white text-[#18181B] font-medium shadow-xs border border-[#E6E5E0]"
                          : "bg-[#EFECE6]/75 hover:bg-[#EAE8E1] text-[#52504A]"
                      )}
                    >
                      {pin.status === "amber" && (
                        <ClockCountdown
                          weight="fill"
                          className="w-3.5 h-3.5 text-[#E07A2E] shrink-0"
                        />
                      )}
                      {pin.status === "dark" && (
                        <Record
                          weight="bold"
                          className="w-3.5 h-3.5 text-[#18181B] shrink-0"
                        />
                      )}
                      {pin.status === "emerald" && (
                        <CheckCircle
                          weight="fill"
                          className="w-3.5 h-3.5 text-[#10B981] shrink-0"
                        />
                      )}
                      <span className="truncate">{pin.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Section 3: Operación Académica */}
        <div className="pt-2 border-t border-[#EAE9E4]">
          {!collapsed && (
            <button
              type="button"
              onClick={() => setLevelsExpanded((prev) => !prev)}
              className="w-full flex items-center justify-between px-2.5 mb-1.5 text-[11px] font-medium text-[#78756E] hover:text-[#18181B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 rounded-md"
            >
              <span>Gestión Académica</span>
              <CaretDown
                weight="bold"
                className={cn(
                  "w-3 h-3 transition-transform duration-150",
                  !levelsExpanded && "-rotate-90"
                )}
              />
            </button>
          )}

          {(levelsExpanded || collapsed) && (
            <nav className="space-y-0.5">
              {academicMenu.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectNav(item.id, item.label);
                      onCloseMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                    aria-label={collapsed ? item.label : undefined}
                    className={cn(
                      "w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-[13px] transition-colors press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                      isActive
                        ? "bg-white text-[#18181B] font-semibold shadow-xs border border-[#E6E5E0]"
                        : "text-[#52504A] hover:bg-[#ECEAE4] hover:text-[#18181B] border border-transparent",
                      collapsed && "justify-center px-0"
                    )}
                  >
                    <span
                      className={cn(
                        "shrink-0",
                        isActive ? "text-[#18181B]" : "text-[#78756E]"
                      )}
                    >
                      {item.renderIcon(isActive)}
                    </span>
                    {!collapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          )}
        </div>

        {/* Reference 4 (Mantra) Bottom Dot-Matrix Institutional Status Card */}
        {!collapsed && (
          <div className="pt-1">
            <div className="relative overflow-hidden rounded-2xl bg-white/85 border border-[#E8E6E0] p-3 shadow-xs">
              {/* Subtle Dot-Matrix Pattern in Top-Right Corner (exact Mantra detail) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-0 right-0 w-24 h-20 opacity-55"
                style={{
                  backgroundImage:
                    "radial-gradient(#A78BFA 1.1px, transparent 1.1px)",
                  backgroundSize: "6px 6px",
                  maskImage:
                    "radial-gradient(circle at top right, black 35%, transparent 80%)",
                  WebkitMaskImage:
                    "radial-gradient(circle at top right, black 35%, transparent 80%)",
                }}
              />
              <div className="relative z-10 flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-[#EDE9FE] text-[#6D28D9] flex items-center justify-center shrink-0 mt-0.5">
                  <Sparkle weight="fill" className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[12px] font-semibold text-[#18181B] leading-tight">
                    Sincronización SIRIME
                  </div>
                  <p className="text-[11px] text-[#78756E] leading-snug mt-0.5">
                    Padrón MEP y actas del II Trimestre verificadas en línea.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Zone: User Profile Dock (Reference 2 Stephen Rotimi pattern) */}
      <div className="p-3 border-t border-[#E8E7E2] bg-[#F3F2EE]/60">
        <div
          className={cn(
            "flex items-center justify-between gap-2.5 px-2 py-1.5 rounded-xl",
            collapsed && "justify-center px-0"
          )}
        >
          <button
            type="button"
            onClick={() => onSelectNav("perfil", "Mi Perfil")}
            className="flex items-center gap-2.5 min-w-0 text-left group rounded-lg -m-1 p-1 hover:bg-black/[0.03] transition-colors"
          >
            <NexusAvatar seed="mariana-solis-directora" size={32} />
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-[12.5px] font-semibold text-[#18181B] truncate leading-tight group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                  {myProfile.name}
                </div>
                <div className="text-[11px] text-[#78756E] truncate leading-tight mt-0.5">
                  direccion@nexus.ed.cr
                </div>
              </div>
            )}
          </button>

          {!collapsed && (
            <button
              type="button"
              onClick={() => onSelectNav("configuracion", "Administración")}
              aria-label="Configuración de cuenta"
              className="w-7 h-7 rounded-lg bg-white border border-[#E5E4DF] shadow-xs flex items-center justify-center text-[#52504A] hover:text-[#18181B] press-scale shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
            >
              <GearSix weight="regular" className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block h-full shrink-0">{sidebarContent}</div>
      <AnimatePresence>
        {mobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-[1px]"
              onClick={onCloseMobile}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 h-full"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
