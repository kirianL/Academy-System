"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlotText } from "slot-text/react";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";
import { MetricShellCard, SectionShellCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NexusAvatar } from "@/components/ui/nexus-avatar";
import { MatrixHistogram } from "@/components/visual/matrix-histogram";
import {
  SegmentedPillProgress,
  ActionScale,
  AcademicWorkCard,
  AcademicProjectCard,
} from "@/components/visual/discrete-progress";
import { CommunicationsInbox } from "@/components/communications/inbox-view";
import { ProfileView } from "@/components/profile/profile-view";
import { InstitutionalFilesView } from "@/components/files/institutional-files-view";
import { ME_EMAIL } from "@/lib/profile-store";
import { OmnibarFilter, FilterToken } from "@/components/ui/omnibar-filter";
import { CommandPalette } from "@/components/ui/command-palette";
import { ToastViewport, ToastMessage } from "@/components/ui/toast-banner";
import {
  INSTITUTION_SUMMARY,
  ATTENDANCE_MATRIX_DATA,
  ACADEMIC_WORKSTREAMS,
  MANTRA_ACADEMIC_PROJECTS,
  PEDAGOGICAL_SUGGESTIONS,
  AcademicWorkstreamItem,
} from "@/lib/mock/nexus-demo-data";
import {
  Flag,
  Diamond,
  CalendarBlank,
  Sparkle,
  Users,
  Plus,
  ClockCountdown,
  CheckCircle,
  BookOpenText,
  ShieldCheck,
  ArrowUpRight,
  X,
  Lightning,
  Clock,
  Archive,
  PlugsConnected,
} from "@phosphor-icons/react";

export default function NexusDashboardPage() {
  const [activeNav, setActiveNav] = React.useState("dashboard");
  const [currentLabel, setCurrentLabel] = React.useState(
    "Resumen Institucional"
  );
  const [activeCampus, setActiveCampus] = React.useState(
    INSTITUTION_SUMMARY.name
  );
  const [activeCycle, setActiveCycle] = React.useState(
    INSTITUTION_SUMMARY.activeCycle
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<
    "resumen" | "evaluaciones" | "comunicaciones" | "sistema" | "perfil" | "archivos"
  >("resumen");
  const [profileTarget, setProfileTarget] = React.useState<{
    email: string;
    name?: string;
    returnTab?: "resumen" | "comunicaciones";
  } | null>(null);
  const [matrixPeriod, setMatrixPeriod] = React.useState("Mensual");
  const [projectStatusTab, setProjectStatusTab] = React.useState<
    "active" | "negotiating" | "archived"
  >("active");
  const [integrationFilter, setIntegrationFilter] = React.useState("Todos");

  const [filterTokens, setFilterTokens] = React.useState<FilterToken[]>([
    {
      id: "ciclo-todos",
      field: "Ciclo Académico",
      operator: "incluye",
      value: "2 niveles (7°–11°)",
    },
  ]);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [selectedWorkstream, setSelectedWorkstream] =
    React.useState<AcademicWorkstreamItem | null>(null);
  const [createModalOpen, setCreateModalOpen] = React.useState(false);
  const [newEvalTitle, setNewEvalTitle] = React.useState("");
  const [newEvalLevel, setNewEvalLevel] = React.useState(
    "10° Año • Secciones 10-1 a 10-6"
  );

  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const pushToast = React.useCallback((title: string, description?: string) => {
    const id = `${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev.slice(-2), { id, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Close modals on Escape key
  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        if (selectedWorkstream) setSelectedWorkstream(null);
        if (createModalOpen) setCreateModalOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedWorkstream, createModalOpen]);

  // Multi-token + search filtering on academic workstreams
  const filteredWorkstreams = React.useMemo(() => {
    return ACADEMIC_WORKSTREAMS.filter((item) => {
      if (
        searchQuery.trim() &&
        !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.code.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.teacher.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }

      for (const token of filterTokens) {
        if (
          token.id === "nivel-div" &&
          !item.cycleTag.includes("Diversificada")
        ) {
          return false;
        }
        if (token.id === "nivel-iii" && !item.cycleTag.includes("III Ciclo")) {
          return false;
        }
        if (
          token.id === "asistencia-alerta" &&
          item.priority !== "Prioritario" &&
          item.priority !== "Crítico" &&
          item.priority !== "Impacto Alto"
        ) {
          return false;
        }
      }

      return true;
    });
  }, [searchQuery, filterTokens]);

  const revisionItems = filteredWorkstreams.filter(
    (i) => i.stage === "revision"
  );
  const activeItems = filteredWorkstreams.filter((i) => i.stage === "active");

  const filteredMantraProjects = React.useMemo(() => {
    return MANTRA_ACADEMIC_PROJECTS.filter((p) => p.tab === projectStatusTab);
  }, [projectStatusTab]);

  const isTechCampus = activeCampus.includes("Técnico");
  const isFirstTrimester = activeCycle.startsWith("I Trimestre");

  const modalEstimatedBudget = React.useMemo(() => {
    if (newEvalLevel.startsWith("11°")) return "₡185.000";
    if (newEvalLevel.startsWith("10°")) return "₡145.000";
    if (newEvalLevel.startsWith("9°")) return "₡132.000";
    return "₡118.500";
  }, [newEvalLevel]);

  return (
    <div className="min-h-screen bg-[#FAF9F6] flex w-full">
      {/* Left Navigation Sidebar */}
      <Sidebar
          activeNav={activeNav}
          onSelectNav={(id, label) => {
            setActiveNav(id);
            setCurrentLabel(label);
            if (id === "perfil") {
              setProfileTarget({
                email: ME_EMAIL,
                name: "M.Sc. Mariana Solís",
                returnTab: activeTab === "comunicaciones" ? "comunicaciones" : "resumen",
              });
              setActiveTab("perfil");
              return;
            }
            if (id === "calificaciones" || id === "pin-actas-10") {
              setActiveTab("evaluaciones");
            } else if (id === "comunicaciones") {
              setActiveTab("comunicaciones");
            } else if (id === "archivos") {
              setActiveTab("archivos");
            } else if (id === "configuracion") {
              setActiveTab("sistema");
            } else if (id === "dashboard") {
              setActiveTab("resumen");
            }
          }}
          activeCycle={activeCycle}
          onCycleChange={(cycle) => setActiveCycle(cycle)}
          activeCampus={activeCampus}
          onCampusChange={(campus) => setActiveCampus(campus)}
          mobileOpen={mobileMenuOpen}
          onCloseMobile={() => setMobileMenuOpen(false)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((prev) => !prev)}
        />

        {/* Main Content Viewport */}
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <Topbar
            parentLabel={activeCampus}
            currentLabel={currentLabel}
            onOpenCommandPalette={() => setCommandOpen(true)}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            sidebarCollapsed={sidebarCollapsed}
            onExpandSidebar={() => setSidebarCollapsed(false)}
            onQuickExport={() =>
              pushToast(
                "Acta consolidada generada",
                "Archivo NEXUS_II_Trimestre_2026.pdf listo para descarga."
              )
            }
            onQuickCreate={() => setCreateModalOpen(true)}
          />

          <main
            className={
              activeTab === "archivos"
                ? "flex-1 w-full min-w-0 p-0 flex flex-col overflow-hidden"
                : "flex-1 px-5 sm:px-8 xl:px-10 py-6 space-y-6 w-full min-w-0"
            }
          >
            {/* Page Greeting & Context Bar (Reference 1 Spark Pixel + Segmented Tabs) */}
            {activeTab === "perfil" || activeTab === "archivos" ? null : activeTab !== "comunicaciones" ? (
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <Badge variant="emerald" uppercase>
                      CICLO LECTIVO ACTIVO
                    </Badge>
                    <span className="text-[12px] text-[#78756E] tabular-nums">
                      Código MEP: {INSTITUTION_SUMMARY.code} •{" "}
                      {INSTITUTION_SUMMARY.levelsCount} niveles (7° a 11°) •{" "}
                      <SlotText
                        text={activeCycle}
                        options={{ duration: 300, stagger: 16 }}
                        className="font-medium text-[#52504A]"
                      />
                    </span>
                  </div>
                  <h1 className="text-[23px] sm:text-[26px] font-semibold tracking-[-0.025em] text-[#18181B] leading-tight">
                    Bienvenida de nuevo, Mariana
                  </h1>
                </div>

                {/* Segmented View Tabs (Reference 1 & 4 Pill Switcher) */}
                <div
                  role="tablist"
                  aria-label="Modo de visualización del panel"
                  className="bg-[#F3F2EE] p-1 rounded-xl border border-[#E8E7E2] inline-flex items-center gap-1 self-start md:self-auto shrink-0"
                >
                  {(
                    [
                      { id: "resumen", label: "Panorama General" },
                      { id: "evaluaciones", label: "Actas (29)" },
                      { id: "comunicaciones", label: "Comunicaciones" },
                      { id: "sistema", label: "Módulos MEP" },
                    ] as const
                  ).map((tab) => {
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => {
                          setActiveTab(tab.id);
                          if (tab.id === "comunicaciones") {
                            setActiveNav("comunicaciones");
                            setCurrentLabel("Comunicaciones");
                          } else if (tab.id === "resumen") {
                            setActiveNav("dashboard");
                            setCurrentLabel("Resumen Institucional");
                          }
                        }}
                        className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[12px] sm:text-[12.5px] font-medium whitespace-nowrap transition-all press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                          isSelected
                            ? "bg-white text-[#18181B] shadow-xs"
                            : "text-[#78756E] hover:text-[#18181B]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between pb-1 border-b border-[#ECEBE7]">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("resumen");
                      setActiveNav("dashboard");
                      setCurrentLabel("Resumen Institucional");
                    }}
                    className="text-[12.5px] font-medium text-[#78756E] hover:text-[#18181B] flex items-center gap-1.5 px-2.5 py-1 rounded-lg hover:bg-[#F3F2EE] transition-colors"
                  >
                    <span>← Volver al Dashboard</span>
                  </button>
                </div>

                <div
                  role="tablist"
                  className="bg-[#F3F2EE] p-1 rounded-xl border border-[#E8E7E2] inline-flex items-center gap-1"
                >
                  {(
                    [
                      { id: "resumen", label: "Dashboard" },
                      { id: "comunicaciones", label: "Inbox Claude" },
                    ] as const
                  ).map((tab) => {
                    const isSelected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        aria-selected={isSelected}
                        onClick={() => {
                          setActiveTab(
                            tab.id as
                              | "resumen"
                              | "evaluaciones"
                              | "comunicaciones"
                              | "sistema"
                              | "perfil"
                          );
                          if (tab.id === "resumen") {
                            setActiveNav("dashboard");
                            setCurrentLabel("Resumen Institucional");
                          }
                        }}
                        className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors ${
                          isSelected
                            ? "bg-white text-[#18181B] shadow-xs"
                            : "text-[#78756E] hover:text-[#18181B]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "perfil" ? (
              <ProfileView
                email={profileTarget?.email ?? ME_EMAIL}
                fallbackName={profileTarget?.name}
                onBack={() => {
                  const dest = profileTarget?.returnTab ?? "comunicaciones";
                  setActiveTab(dest);
                  setActiveNav(dest === "comunicaciones" ? "comunicaciones" : "dashboard");
                  setCurrentLabel(
                    dest === "comunicaciones" ? "Comunicaciones" : "Resumen Institucional"
                  );
                }}
                onMessage={() => {
                  setActiveTab("comunicaciones");
                  setActiveNav("comunicaciones");
                  setCurrentLabel("Comunicaciones");
                  pushToast(
                    "Bandeja de comunicaciones abierta",
                    `Destinatario: ${profileTarget?.email ?? ME_EMAIL}`
                  );
                }}
                onPushToast={pushToast}
              />
            ) : activeTab === "comunicaciones" ? (
              <CommunicationsInbox
                onPushToast={pushToast}
                onOpenProfile={(email, name) => {
                  setProfileTarget({
                    email,
                    name,
                    returnTab: "comunicaciones",
                  });
                  setActiveTab("perfil");
                  setActiveNav(email === ME_EMAIL ? "perfil" : "comunicaciones");
                  setCurrentLabel(name ?? "Perfil Institucional");
                }}
              />
            ) : activeTab === "archivos" ? (
              <InstitutionalFilesView />
            ) : activeTab !== "sistema" ? (
              <>
                {/* KPI Cards Row (Exact Reference 1 Spark Pixel Team Concentric 2-Layer Cards + SlotText) */}
                {activeTab === "resumen" && (
                  <section
                    aria-label="Indicadores clave institucionales"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3.5 items-stretch"
                  >
                    <MetricShellCard
                      label="MATRÍCULA ACTIVA"
                      value={isTechCampus ? "312" : "568"}
                      unit={isTechCampus ? "16 secciones" : "29 secciones"}
                      trendValue={isTechCampus ? "+4,2%" : "+3,8%"}
                      trendLabel="vs ciclo anterior"
                      trendPositive={true}
                      sparklineValues={[52, 68, 74, 95, 82, 88]}
                      highlightIndex={3}
                    />
                    <MetricShellCard
                      label="ASISTENCIA PROMEDIO"
                      value={isFirstTrimester ? "95,1%" : "94,6%"}
                      unit="Diaria"
                      trendValue={isFirstTrimester ? "+1,9%" : "+1,4%"}
                      trendLabel="vs I Trimestre"
                      trendPositive={true}
                      sparklineValues={[75, 82, 78, 88, 96, 91]}
                      highlightIndex={4}
                    />
                    <MetricShellCard
                      label="RENDIMIENTO GENERAL"
                      value={isFirstTrimester ? "85,0" : "84,2"}
                      unit="Promedio MEP"
                      trendValue="+2,1 pts"
                      trendLabel="aprobación 91%"
                      trendPositive={true}
                      sparklineValues={[60, 70, 66, 92, 78, 84]}
                      highlightIndex={3}
                    />
                    <MetricShellCard
                      label="BECAS Y COMEDOR"
                      value={isTechCampus ? "₡11,20M" : "₡18,45M"}
                      unit={isTechCampus ? "86 becas" : "142 becas"}
                      trendValue="96,2%"
                      trendLabel="presupuesto anual"
                      trendPositive={true}
                      sparklineValues={[45, 58, 72, 68, 94, 80]}
                      highlightIndex={4}
                    />
                  </section>
                )}

                {/* Main Analytics & Academic Health Grid (Reference 1 Spark Pixel + Reference 3 Readability 85) */}
                {activeTab === "resumen" && (
                  <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 items-stretch">
                    {/* Left 8 Cols: Square Pixel Matrix Histogram Chart (Reference 1 Sales Trend adaptation) */}
                    <div className="xl:col-span-8 flex">
                      <SectionShellCard
                        className="w-full h-full"
                        title="TENDENCIA DE ASISTENCIA Y PERMANENCIA ESTUDIANTIL"
                        showInfoIcon
                        infoTooltipText="Metodología MEP: Cada celda cuadrada representa una cohorte de estudiantes con asistencia confirmada vs tardías/ausencias justificadas por semana lectiva."
                        onMoreClick={() =>
                          pushToast(
                            "Opciones de serie temporal",
                            "Mostrando los 568 expedientes activos por semana lectiva."
                          )
                        }
                      >
                        <MatrixHistogram
                          totalLabel="Asistencia Media"
                          totalValue={
                            isTechCampus ? "95,4% (298/312)" : "94,6% (537/568)"
                          }
                          primarySeriesLabel="ASISTENCIA REGULAR"
                          secondarySeriesLabel="JUSTIFICADAS / TARDÍAS"
                          periodOptions={["Semanal", "Mensual", "Trimestral"]}
                          activePeriod={matrixPeriod}
                          onPeriodChange={(p) => {
                            setMatrixPeriod(p);
                            pushToast(`Agrupación cambiada a ${p}`);
                          }}
                          data={ATTENDANCE_MATRIX_DATA}
                          yAxisLabels={[
                            "568",
                            "480",
                            "390",
                            "300",
                            "210",
                            "120",
                            "0",
                          ]}
                          defaultSelectedCol={21}
                        />
                      </SectionShellCard>
                    </div>

                    {/* Right 4 Cols: Academic Health Scale & Suggestions (Reference 3 Readability 85 adaptation) */}
                    <div className="xl:col-span-4 flex">
                      <SectionShellCard
                        className="w-full h-full"
                        title="BALANCE CURRICULAR"
                        headerRight={
                          <Badge variant="outline" size="xs">
                            II Trimestre
                          </Badge>
                        }
                      >
                        <div className="space-y-5">
                          <ActionScale
                            scoreTitle="Índice de Aprobación Institucional"
                            scoreValue="91,4%"
                            scoreSubtitle="Desempeño estable en 26 de 29 secciones"
                            scaleTitle="Escala de Carga Evaluativa"
                            activeSegmentIndex={2}
                            onSegmentChange={(idx) =>
                              pushToast(
                                `Simulación de carga evaluativa: Nivel ${
                                  idx + 1
                                }/10`,
                                "Proyección de aprobación actualizada."
                              )
                            }
                            labels={["Baja", "Equilibrada", "Sobrecarga"]}
                          />

                          {/* Reference 3 Suggestions List with Halo Dots & Italic Highlights */}
                          <div className="pt-2 border-t border-[#ECEBE7]">
                            <div className="flex items-center justify-between mb-2.5">
                              <span className="text-[13.5px] font-semibold text-[#18181B]">
                                Alertas Pedagógicas
                              </span>
                              <span className="text-[11.5px] text-[#78756E] tabular-nums">
                                3 prioritarias
                              </span>
                            </div>

                            <div className="space-y-2">
                              {PEDAGOGICAL_SUGGESTIONS.map((item) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() =>
                                    pushToast(item.category, item.highlight)
                                  }
                                  className="w-full text-left bg-[#FAF9F6] hover:bg-[#F3F2EE] border border-[#ECEBE7] rounded-xl p-3 transition-colors press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                                >
                                  <div className="flex items-center gap-2 text-[11.5px] text-[#78756E] mb-1">
                                    <span
                                      className="w-2.5 h-2.5 rounded-full shrink-0"
                                      style={{
                                        backgroundColor: item.dotColor,
                                        boxShadow: `0 0 0 3.5px ${item.dotColor}24`,
                                      }}
                                    />
                                    <span>{item.category}</span>
                                  </div>
                                  <div className="text-[12.5px] font-medium italic text-[#18181B] pl-4">
                                    {item.highlight}
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </SectionShellCard>
                    </div>
                  </section>
                )}

                {/* Reference 4 (Mantra Projects): Proyectos y Programas Institucionales */}
                {activeTab === "resumen" && (
                  <section
                    aria-label="Proyectos y programas institucionales"
                    className="space-y-4 pt-1"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-[#18181B]">
                          Proyectos y Programas Institucionales
                        </h2>
                        <p className="text-[13px] text-[#78756E]">
                          Iniciativas estratégicas, laboratorios STEM y programas de bienestar estudiantil con presupuesto en colones (₡).
                        </p>
                      </div>

                      {/* Exact Reference 4 (Mantra) Segmented Status Tabs with Phosphor Icons */}
                      <div
                        role="tablist"
                        aria-label="Estado de proyectos institucionales"
                        className="bg-[#F3F2EE] p-1 rounded-xl border border-[#E8E7E2] inline-flex items-center gap-1 self-start sm:self-auto"
                      >
                        {(
                          [
                            {
                              id: "active",
                              label: "Activos",
                              icon: (active: boolean) => (
                                <Lightning
                                  weight={active ? "fill" : "regular"}
                                  className={
                                    active
                                      ? "w-3.5 h-3.5 text-[#6D28D9]"
                                      : "w-3.5 h-3.5 text-[#78756E]"
                                  }
                                />
                              ),
                            },
                            {
                              id: "negotiating",
                              label: "En Revisión",
                              icon: (active: boolean) => (
                                <Clock
                                  weight={active ? "fill" : "regular"}
                                  className={
                                    active
                                      ? "w-3.5 h-3.5 text-[#D97706]"
                                      : "w-3.5 h-3.5 text-[#78756E]"
                                  }
                                />
                              ),
                            },
                            {
                              id: "archived",
                              label: "Archivados",
                              icon: (active: boolean) => (
                                <Archive
                                  weight={active ? "fill" : "regular"}
                                  className={
                                    active
                                      ? "w-3.5 h-3.5 text-[#18181B]"
                                      : "w-3.5 h-3.5 text-[#78756E]"
                                  }
                                />
                              ),
                            },
                          ] as const
                        ).map((t) => {
                          const isSelected = projectStatusTab === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              role="tab"
                              aria-selected={isSelected}
                              onClick={() => setProjectStatusTab(t.id)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${
                                isSelected
                                  ? "bg-white text-[#18181B] shadow-xs"
                                  : "text-[#78756E] hover:text-[#18181B]"
                              }`}
                            >
                              {t.icon(isSelected)}
                              <span>{t.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
                      {filteredMantraProjects.map((proj) => (
                        <AcademicProjectCard
                          key={proj.id}
                          department={proj.department}
                          dateLabel={proj.dateLabel}
                          statusLabel={proj.statusLabel}
                          statusTone={proj.tab}
                          title={proj.title}
                          tags={proj.tags}
                          platformLabel={proj.platformLabel}
                          budgetRangeCRC={proj.budgetRangeCRC}
                          dueDateLabel={proj.dueDateLabel}
                          messagesLabel={proj.messagesLabel}
                          unreadMessages={proj.unreadMessages}
                          bannerVariant={proj.bannerVariant}
                          onClick={() =>
                            pushToast(
                              proj.title,
                              `${proj.department} • Presupuesto: ${proj.budgetRangeCRC}`
                            )
                          }
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Pipeline of Academic Evaluations & Sections (Reference 2 Acme Development Pipeline adaptation) */}
                <section
                  aria-label="Flujo de trabajo académico y cierre de actas"
                  className="space-y-4 pt-2"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h2 className="text-[19px] font-semibold tracking-[-0.02em] text-[#18181B]">
                        Seguimiento de Evaluaciones y Actas
                      </h2>
                      <p className="text-[13px] text-[#78756E]">
                        Supervisa el avance de calificaciones, pruebas parciales y cierres por departamento docente.
                      </p>
                    </div>

                    {/* Reference 2 Contributors Pill + Avatar Stack */}
                    <div className="flex items-center gap-2.5 self-start sm:self-auto">
                      <span className="inline-flex items-center gap-1.5 bg-[#F4F3F0] border border-[#E6E4DF] rounded-full px-3 py-1 text-[12px] font-medium text-[#52504A]">
                        <Users
                          weight="regular"
                          className="w-3.5 h-3.5 text-[#78756E]"
                        />
                        <span>Coordinadores (30 docentes)</span>
                      </span>
                      <div className="flex -space-x-2">
                        {[
                          { name: "Valeria Mora", seed: "valeria-mora" },
                          { name: "Carlos Brenes", seed: "carlos-brenes" },
                          { name: "Sofia Vargas", seed: "sofia-vargas" },
                          { name: "David Castro", seed: "david-castro" },
                        ].map((c) => (
                          <NexusAvatar
                            key={c.seed}
                            seed={c.seed}
                            size={28}
                            className="ring-2 ring-white shadow-2xs"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Omnibar Multi-Token Filter (Reference 2 exact pattern) */}
                  <OmnibarFilter
                    tokens={filterTokens}
                    onRemoveToken={(id) =>
                      setFilterTokens((prev) =>
                        prev.filter((t) => t.id !== id)
                      )
                    }
                    onAddToken={(token) =>
                      setFilterTokens((prev) => [...prev, token])
                    }
                    onClearAll={() => setFilterTokens([])}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                  />

                  {/* Stage 1: En Revisión de Coordinación (Reference 2 Code Review section) */}
                  <div className="space-y-3.5 pt-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Badge variant="amber" size="md">
                          <ClockCountdown
                            weight="fill"
                            className="w-3.5 h-3.5 text-[#D97706]"
                          />
                          <span>En Revisión de Coordinación</span>
                        </Badge>
                        <SegmentedPillProgress
                          current={
                            revisionItems.length === 3
                              ? 19
                              : revisionItems.reduce(
                                  (acc, r) => acc + Math.min(r.sectionsCount, 9),
                                  0
                                )
                          }
                          total={29}
                          delta={`+${revisionItems.length}`}
                          activeColor="#E07A2E"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setCreateModalOpen(true)}
                        aria-label="Agregar evaluación en revisión"
                        className="w-8 h-8 rounded-xl hover:bg-[#F3F2EE] flex items-center justify-center text-[#52504A] hover:text-[#18181B] press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                      >
                        <Plus weight="bold" className="w-4 h-4" />
                      </button>
                    </div>

                    {revisionItems.length === 0 ? (
                      <div className="bg-[#FAF9F6] border border-dashed border-[#DFDDD6] rounded-2xl p-6 text-center text-[13px] text-[#78756E]">
                        No hay actas en revisión que coincidan con los filtros seleccionados.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3.5">
                        {revisionItems.map((item) => (
                          <AcademicWorkCard
                            key={item.id}
                            icon={
                              <BookOpenText
                                weight="fill"
                                className="w-3.5 h-3.5"
                              />
                            }
                            iconBg={item.iconBg}
                            title={item.title}
                            code={item.code}
                            itemCount={item.sectionsCount}
                            timeAgo={item.updatedAgo}
                            onClick={() => setSelectedWorkstream(item)}
                            metadata={[
                              {
                                icon: (
                                  <Flag weight="regular" className="w-3 h-3" />
                                ),
                                label: "Nivel",
                                value: item.level,
                              },
                              {
                                icon: (
                                  <Diamond
                                    weight="regular"
                                    className="w-3 h-3"
                                  />
                                ),
                                label: "Prioridad",
                                value: item.priority,
                              },
                              {
                                icon: (
                                  <CalendarBlank
                                    weight="regular"
                                    className="w-3 h-3"
                                  />
                                ),
                                label: "Fecha Límite",
                                value: item.dueDate,
                              },
                            ]}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Stage 2: Evaluaciones en Ejecución (Reference 2 Active Development section) */}
                  <div className="space-y-3.5 pt-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <Badge variant="emerald" size="md">
                          <CheckCircle
                            weight="fill"
                            className="w-3.5 h-3.5 text-[#059669]"
                          />
                          <span>Evaluaciones en Aplicación</span>
                        </Badge>
                        <SegmentedPillProgress
                          current={
                            activeItems.length === 3
                              ? 24
                              : activeItems.reduce(
                                  (acc, r) => acc + r.sectionsCount,
                                  0
                                )
                          }
                          total={30}
                          delta={`+${activeItems.length}`}
                          activeColor="#059669"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => setCreateModalOpen(true)}
                        aria-label="Agregar evaluación activa"
                        className="w-8 h-8 rounded-xl hover:bg-[#F3F2EE] flex items-center justify-center text-[#52504A] hover:text-[#18181B] press-scale focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
                      >
                        <Plus weight="bold" className="w-4 h-4" />
                      </button>
                    </div>

                    {activeItems.length === 0 ? (
                      <div className="bg-[#FAF9F6] border border-dashed border-[#DFDDD6] rounded-2xl p-6 text-center text-[13px] text-[#78756E]">
                        No hay evaluaciones en aplicación que coincidan con los filtros seleccionados.
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3.5">
                        {activeItems.map((item) => (
                          <AcademicWorkCard
                            key={item.id}
                            icon={
                              <Sparkle weight="fill" className="w-3.5 h-3.5" />
                            }
                            iconBg={item.iconBg}
                            title={item.title}
                            code={item.code}
                            itemCount={item.sectionsCount}
                            timeAgo={item.updatedAgo}
                            onClick={() => setSelectedWorkstream(item)}
                            metadata={[
                              {
                                icon: (
                                  <Flag weight="regular" className="w-3 h-3" />
                                ),
                                label: "Nivel",
                                value: item.level,
                              },
                              {
                                icon: (
                                  <Diamond
                                    weight="regular"
                                    className="w-3 h-3"
                                  />
                                ),
                                label: "Estado",
                                value: item.priority,
                              },
                              {
                                icon: (
                                  <CalendarBlank
                                    weight="regular"
                                    className="w-3 h-3"
                                  />
                                ),
                                label: "Cierre",
                                value: item.dueDate,
                              },
                            ]}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              </>
            ) : (
              /* Reference 5 (Settings / Integrations Showcase — `Discover More Than 100+ Plugins to Integrate`) */
              <SectionShellCard
                title="Módulos Oficiales e Integraciones Institucionales"
                subtitle="Conecta el expediente académico de Institución Demo NEXUS con los servicios oficiales del MEP, IMAS y mensajería"
                icon={<PlugsConnected weight="fill" className="w-4 h-4" />}
              >
                <div className="space-y-6">
                  {/* Reference 5 Segmented Filter Bar (`All | Logistics | Payments | Fulfillment`) */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="bg-[#F3F2EE] p-1 rounded-xl border border-[#E8E7E2] inline-flex items-center gap-1">
                      {["Todos", "Académico", "Bienestar", "Comunicaciones"].map(
                        (cat) => {
                          const isSelected = integrationFilter === cat;
                          return (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setIntegrationFilter(cat)}
                              className={`px-3 py-1 rounded-lg text-[12px] font-medium transition-colors press-scale ${
                                isSelected
                                  ? "bg-white text-[#18181B] shadow-xs"
                                  : "text-[#78756E] hover:text-[#18181B]"
                              }`}
                            >
                              {cat}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="emerald" uppercase>
                        ACTIVO • MATRICULADO
                      </Badge>
                      <Badge variant="amber">En Revisión (19/29)</Badge>
                      <Badge variant="indigo">Educación Diversificada</Badge>
                    </div>
                  </div>

                  {/* Reference 5 App Integration Cards (`DHL Express` / `FedEx` / `Adyen` pattern) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      {
                        title: "Registro Digital MEP (SIRIME)",
                        category: "Académico",
                        desc: "Sincronización de notas de Trabajo Cotidiano, Tareas, Pruebas y Asistencia por trimestre.",
                        status: "INSTALADO",
                        installed: true,
                        color: "#059669",
                      },
                      {
                        title: "Comedor y Becas PANEA • IMAS",
                        category: "Bienestar",
                        desc: "Control presupuestario en colones (₡18,45M) y padrón de 142 beneficiarios activos.",
                        status: "INSTALADO",
                        installed: true,
                        color: "#2563EB",
                      },
                      {
                        title: "Notificaciones a Encargados",
                        category: "Comunicaciones",
                        desc: "Alertas automáticas de ausencias injustificadas, boletas y circulares oficiales.",
                        status: "DISPONIBLE",
                        installed: false,
                        color: "#E07A2E",
                      },
                    ]
                      .filter(
                        (m) =>
                          integrationFilter === "Todos" ||
                          m.category === integrationFilter
                      )
                      .map((mod) => (
                        <div
                          key={mod.title}
                          className="bg-white border border-[#E8E6E1] rounded-2xl p-5 flex flex-col justify-between gap-4 shadow-xs hover-lift"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-3 mb-3.5">
                              <div
                                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-bold text-[13px] shadow-sm"
                                style={{ backgroundColor: mod.color }}
                              >
                                <ShieldCheck weight="fill" className="w-5 h-5" />
                              </div>
                              <Badge
                                variant={mod.installed ? "emerald" : "neutral"}
                                uppercase
                              >
                                {mod.status}
                              </Badge>
                            </div>
                            <h4 className="text-[15.5px] font-semibold text-[#18181B] mb-1">
                              {mod.title}
                            </h4>
                            <p className="text-[13px] text-[#78756E] leading-relaxed">
                              {mod.desc}
                            </p>
                          </div>

                          <div className="pt-1">
                            {mod.installed ? (
                              <Button
                                variant="danger-outline"
                                size="sm"
                                onClick={() =>
                                  pushToast(`Configurando ${mod.title}`)
                                }
                              >
                                Configurar Módulo
                                <ArrowUpRight
                                  weight="bold"
                                  className="w-3.5 h-3.5"
                                />
                              </Button>
                            ) : (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() =>
                                  pushToast(`${mod.title} habilitado`)
                                }
                              >
                                Instalar Módulo
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </SectionShellCard>
            )}
          </main>
        </div>

      {/* Smooth Adaptive Workstream Detail Modal */}
      <AnimatePresence>
        {selectedWorkstream && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setSelectedWorkstream(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedWorkstream.title}
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 12,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 8,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 32,
                mass: 0.75,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#F4F3F0] border border-[#DFDDD6] rounded-2xl p-1.5 shadow-floating my-auto"
            >
              <div className="bg-white rounded-[12px] p-5 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11.5px] font-mono text-[#78756E]">
                      {selectedWorkstream.code} • {selectedWorkstream.cycleTag}
                    </span>
                    <h3 className="text-[16px] font-semibold text-[#18181B] mt-0.5">
                      {selectedWorkstream.title}
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedWorkstream(null)}
                    aria-label="Cerrar modal"
                    className="w-7 h-7 rounded-lg hover:bg-[#F3F2EE] flex items-center justify-center text-[#78756E] hover:text-[#18181B] transition-colors"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-[#FAF9F6] border border-[#ECEBE7] rounded-xl p-3.5 space-y-2.5 text-[12.5px]">
                  <div className="flex justify-between">
                    <span className="text-[#78756E]">Responsable:</span>
                    <span className="font-medium text-[#18181B]">
                      {selectedWorkstream.teacher}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78756E]">Niveles incluidos:</span>
                    <span className="font-medium text-[#18181B]">
                      {selectedWorkstream.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78756E]">
                      Secciones vinculadas:
                    </span>
                    <span className="font-mono font-medium text-[#18181B] tabular-nums">
                      {selectedWorkstream.sectionsCount} secciones
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#78756E]">
                      Fecha límite de acta:
                    </span>
                    <span className="font-medium text-[#18181B]">
                      {selectedWorkstream.dueDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setSelectedWorkstream(null)}
                  >
                    Cerrar
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      pushToast(
                        `Acta ${selectedWorkstream.code} validada`,
                        `Se notificó a ${selectedWorkstream.teacher}`
                      );
                      setSelectedWorkstream(null);
                    }}
                  >
                    Aprobar y Firmar Acta
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Smooth Adaptive New Academic Record Modal */}
      <AnimatePresence>
        {createModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-0 z-50 bg-black/25 backdrop-blur-[2px] flex items-center justify-center p-4 overflow-y-auto"
            onClick={() => setCreateModalOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Nuevo Registro Académico"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 12,
                filter: "blur(4px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 8,
                filter: "blur(2px)",
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 32,
                mass: 0.75,
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-[#F4F3F0] border border-[#DFDDD6] rounded-2xl p-1.5 shadow-floating my-auto"
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  pushToast(
                    "Registro académico creado",
                    `${
                      newEvalTitle || "Evaluación Parcial"
                    } asignada a ${newEvalLevel}`
                  );
                  setNewEvalTitle("");
                  setCreateModalOpen(false);
                }}
                className="bg-white rounded-[12px] p-5 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-[16px] font-semibold text-[#18181B]">
                    Programar Evaluación o Acta
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCreateModalOpen(false)}
                    aria-label="Cerrar modal"
                    className="w-7 h-7 rounded-lg hover:bg-[#F3F2EE] flex items-center justify-center text-[#78756E] hover:text-[#18181B] transition-colors"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[12px] font-medium text-[#52504A] mb-1">
                      Título de la evaluación o comunicado
                    </label>
                    <Input
                      variant="subtle"
                      required
                      value={newEvalTitle}
                      onChange={(e) => setNewEvalTitle(e.target.value)}
                      placeholder="Ej. II Prueba Parcial • Estudios Sociales"
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-[12px] font-medium text-[#52504A] mb-1">
                      Nivel y Secciones (Institución Demo NEXUS)
                    </label>
                    <select
                      value={newEvalLevel}
                      onChange={(e) => setNewEvalLevel(e.target.value)}
                      className="w-full h-9 px-3 text-[13px] bg-[#FAF9F6] border border-[#ECEBE7] rounded-xl text-[#18181B] hover:bg-white hover:border-[#DFDDD6] focus:bg-white focus:border-[#18181B] focus:ring-2 focus:ring-zinc-900/[0.08] focus:outline-none transition-all duration-140 cursor-pointer"
                    >
                      <option>7° Año • Secciones 7-1 a 7-6</option>
                      <option>8° Año • Secciones 8-1 a 8-6</option>
                      <option>9° Año • Secciones 9-1 a 9-6</option>
                      <option>10° Año • Secciones 10-1 a 10-6</option>
                      <option>11° Año • Secciones 11-1 a 11-5</option>
                    </select>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#ECEBE7] flex items-center justify-between text-[12px]">
                    <span className="text-[#78756E]">
                      Presupuesto estimado (materiales):
                    </span>
                    <SlotText
                      text={modalEstimatedBudget}
                      options={{ duration: 300, stagger: 20, bounce: 0.35 }}
                      className="font-mono font-semibold text-[#18181B] tabular-nums"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setCreateModalOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" variant="primary" size="sm">
                    Guardar en Calendario
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette (Ctrl + K) */}
      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onSelectAction={(msg) => pushToast(msg)}
      />

      {/* Toast Feedback Viewport */}
      <ToastViewport
        toasts={toasts}
        onDismiss={(id) =>
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }
      />
    </div>
  );
}
