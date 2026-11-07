"use client";

import * as React from "react";
import { SlotText } from "slot-text/react";
import {
  MagnifyingGlass,
  CaretRight,
  List,
  SidebarSimple,
  Bell,
  DownloadSimple,
  Plus,
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";

export interface TopbarProps {
  parentLabel?: string;
  currentLabel: string;
  onOpenCommandPalette: () => void;
  onOpenMobileMenu: () => void;
  sidebarCollapsed?: boolean;
  onExpandSidebar?: () => void;
  onQuickExport?: () => void;
  onQuickCreate?: () => void;
}

export function Topbar({
  parentLabel = "Institución Demo NEXUS",
  currentLabel,
  onOpenCommandPalette,
  onOpenMobileMenu,
  sidebarCollapsed = false,
  onExpandSidebar,
  onQuickExport,
  onQuickCreate,
}: TopbarProps) {
  const [exportFlash, setExportFlash] = React.useState(false);

  return (
    <header className="h-14 px-5 sm:px-8 xl:px-10 border-b border-[#ECEBE7] bg-white/85 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-4 w-full">
      {/* Left: Mobile Trigger / Collapse Toggle + Breadcrumbs */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          type="button"
          onClick={onOpenMobileMenu}
          aria-label="Abrir menú de navegación"
          className="lg:hidden w-8 h-8 rounded-lg bg-[#F4F3F0] border border-[#E6E4DF] flex items-center justify-center text-ink-primary press-scale shrink-0"
        >
          <List weight="bold" className="w-4 h-4" />
        </button>

        {sidebarCollapsed && onExpandSidebar && (
          <button
            type="button"
            onClick={onExpandSidebar}
            aria-label="Expandir barra lateral"
            className="hidden lg:flex w-7 h-7 rounded-lg bg-[#F4F3F0] border border-[#E6E4DF] items-center justify-center text-ink-secondary hover:text-ink-primary press-scale shrink-0"
          >
            <SidebarSimple weight="regular" className="w-4 h-4" />
          </button>
        )}

        <nav
          aria-label="Ruta de navegación"
          className="flex items-center gap-1.5 text-[12.5px] min-w-0"
        >
          <span className="text-[#78756E] hidden sm:inline truncate">
            {parentLabel}
          </span>
          <CaretRight
            weight="bold"
            className="w-3 h-3 text-[#C2BFB6] hidden sm:inline shrink-0"
          />
          <SlotText
            text={currentLabel}
            options={{
              rollBy: "word",
              duration: 300,
              stagger: 35,
              bounce: 0.3,
            }}
            className="font-medium text-[#18181B] truncate"
          />
        </nav>
      </div>

      {/* Right: Search Omnibar Trigger + Actions */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        {/* Search Trigger Pill (Reference 1 & Reference 2 pattern) */}
        <button
          type="button"
          onClick={onOpenCommandPalette}
          className="bg-[#F4F3F0] hover:bg-[#ECEAE4] border border-[#E6E4DF] rounded-xl px-3 h-8 flex items-center justify-between gap-6 text-[12.5px] text-[#78756E] transition-colors press-scale"
        >
          <span className="flex items-center gap-2">
            <MagnifyingGlass
              weight="regular"
              className="w-3.5 h-3.5 text-[#78756E]"
            />
            <span className="hidden md:inline">Buscar...</span>
          </span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white text-[#52504A] border border-[#E4E3DD] rounded shadow-xs">
            Ctrl K
          </kbd>
        </button>

        {/* Notifications Bell */}
        <button
          type="button"
          onClick={() => onQuickExport?.()}
          aria-label="Alertas académicas"
          className="relative w-8 h-8 rounded-xl bg-white border border-border hover:bg-[#FAF9F6] flex items-center justify-center text-[#52504A] hover:text-[#18181B] shadow-xs press-scale"
        >
          <Bell weight="regular" className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#E07A2E]" />
        </button>

        {/* Secondary & Primary Actions with SlotText Tactile Roll */}
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setExportFlash(true);
            onQuickExport?.();
            setTimeout(() => setExportFlash(false), 1800);
          }}
          className="hidden sm:inline-flex"
        >
          <DownloadSimple
            weight="bold"
            className="w-3.5 h-3.5 text-[#78756E]"
          />
          <SlotText
            text={exportFlash ? "Acta Lista" : "Exportar Acta"}
            options={{ duration: 280, stagger: 18, bounce: 0.35 }}
          />
        </Button>

        <Button variant="primary" size="sm" onClick={onQuickCreate}>
          <Plus weight="bold" className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nuevo Registro</span>
        </Button>
      </div>
    </header>
  );
}
