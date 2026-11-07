# NEXUS — Master Roadmap & Milestones

---

## Phase Overview

- [x] **FASE 1 — Análisis visual, skills y planificación**
  - [x] Inspeccionar y sintetizar las 5 referencias visuales.
  - [x] Instalar y verificar las skills de Emil Kowalski (`emil-design-eng`, `apple-design`, `animation-performance`).
  - [x] Diseñar los tokens de interfaz, layout de superficies y lineamientos de animación.
  - [x] Crear `PROJECT_CONTEXT.md`.
  - [x] Crear `DESIGN.md`.
  - [x] Crear `ARCHITECTURE.md`.
  - [x] Crear `DATABASE.md`.
  - [x] Crear `ROADMAP.md`.
  - [x] Crear `PROGRESS.md`.

- [x] **FASE 2 — Fundación y sistema de diseño**
  - [x] Inicializar el proyecto con Next.js 15+ (App Router), TypeScript, Tailwind CSS, Lucide React, Radix UI.
  - [x] Implementar tokens en CSS variables y Tailwind theme (fondos cálidos `#F3F2EE`, superficies `#FFFFFF`, bordes `#E8E7E2`).
  - [x] Construir componentes base: Button (con `:active scale(0.97)`), Card (`MetricShellCard`, `SectionShellCard`), Badge, OmnibarFilter, CommandPalette (`Ctrl + K`), ToastViewport.
  - [x] Diseñar el layout maestro de la aplicación: Outer container de 24px radio, Topbar con breadcrumbs y búsqueda global (`Ctrl + K`), Sidebar retráctil y User Dock.
  - [x] Implementar componentes visuales propios: `SegmentedPillProgress` (micro-pills verticales), `MatrixHistogram`, `ActionScale`, `AcademicWorkCard`.

- [ ] **FASE 3 — Autenticación y arquitectura multiinstitucional**
  - [ ] Modelo de instituciones educativas y selector de institución activa.
  - [ ] Simulación y contexto de sesión con conmutador de rol (Superadmin, Admin Institucional, Docente, Estudiante, Encargado).
  - [ ] Protección de rutas y control de acceso basado en roles (RBAC).
  - [ ] Generación de base de datos de demostración realista (Institución Demo NEXUS: 568 estudiantes, 30 docentes, 29 secciones).

- [ ] **FASE 4 — Administración institucional**
  - [ ] Dashboard administrativo con KPIs clave, gráficos de matriculación y estado general.
  - [ ] Directorio y gestión integral de estudiantes: listado con búsqueda facetada, filtros por nivel/sección, alta/edición y expediente 360°.
  - [ ] Directorio de docentes con carga académica y asignaciones.
  - [ ] Estructura académica: niveles (7° a 11°), secciones y asignaturas.
  - [ ] Módulo de matrícula: periodos lectivos y asignación de alumnos.

- [ ] **FASE 5 — Operación académica**
  - [ ] Sistema de asistencia diaria con matriz rápida interactiva (Presente, Ausente Injustificado, Justificado, Tardía) y justificaciones.
  - [ ] Cuaderno de calificaciones con desglose de rubros MEP (Cotidiano, Tareas, Pruebas, Asistencia), promedios en tiempo real y estados.
  - [ ] Horarios interactivos y calendario académico institucional.

- [ ] **FASE 6 — Portales por perfil**
  - [ ] Portal Docente: gestión de grupos asignados, pase de lista rápido y registro de notas.
  - [ ] Portal Estudiante: horario del día, calificaciones actuales, historial de asistencia y asignaciones pendientes.
  - [ ] Portal Encargado: monitoreo de dependientes, alertas de inasistencia y boletines.

- [ ] **FASE 7 — Centro de comunicaciones (Omni-Inbox)**
  - [ ] Bandeja de entrada con arquitectura de 3 columnas (Rail de iconos, lista de carpetas, lista de mensajes y panel de lectura).
  - [ ] Visualización de hilos, redactar mensaje con autocompletado de destinatarios, filtros de comunicados y archivos adjuntos.

- [ ] **FASE 8 — Analítica y reportes**
  - [ ] Métricas de rendimiento, riesgo de deserción y comparativa entre trimestres.
  - [ ] Exportación de reportes académicos a PDF y CSV.

- [ ] **FASE 9 — Responsive, accesibilidad y rendimiento**
  - [ ] Adaptación responsive completa en móvil y tablet (menú colapsable, tarjetas adaptables para tablas, touch targets >= 44px).
  - [ ] Auditoría de accesibilidad WCAG 2.2 AA (navegación por teclado, contraste, labels, focus rings).
  - [ ] Optimización de animación y frame budget (GPU composite properties, `prefers-reduced-motion`).

- [ ] **FASE 10 — Testing y acabado profesional**
  - [ ] Pruebas unitarias de cálculo de promedios y validación de esquemas Zod.
  - [ ] Documentación final y verificación completa en navegador.
