"use client";

import * as React from "react";
import { SlotText } from "slot-text/react";
import {
  CaretRight,
  List,
  SidebarSimple,
} from "@phosphor-icons/react";

export interface TopbarProps {
  parentLabel?: string;
  currentLabel: string;
  onOpenCommandPalette?: () => void;
  onOpenMobileMenu: () => void;
  sidebarCollapsed?: boolean;
  onExpandSidebar?: () => void;
  onQuickExport?: () => void;
  onQuickCreate?: () => void;
}

export function Topbar({
  parentLabel = "Institución Demo NEXUS",
  currentLabel,
  onOpenMobileMenu,
  sidebarCollapsed = false,
  onExpandSidebar,
}: TopbarProps) {
  return (
    <header className="h-14 px-4 sm:px-8 xl:px-10 border-b border-[#ECEBE7] bg-white/85 backdrop-blur-md sticky top-0 z-20 flex items-center justify-between gap-4 w-full">
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
    </header>
  );
}
