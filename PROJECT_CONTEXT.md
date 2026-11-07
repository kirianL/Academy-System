# NEXUS — Academic Management SaaS Platform

## PROJECT CONTEXT & PRODUCT SPECIFICATION

### 1. Vision & Executive Summary

**NEXUS** is a next-generation academic management SaaS platform tailored for educational institutions (K-12, high schools, colleges, and polytechnic institutes). Unlike legacy academic portals or generic admin dashboard templates, NEXUS combines commercial SaaS polish, high data density, intuitive master-detail workflows, and multi-tenant isolation with a bespoke, tactile design system inspired by top-tier modern software (Raycast, Linear, Vercel, Supabase, and Claude).

The target demonstration scenario models a realistic educational institution in Costa Rica:

- **Institution**: _Institución Demo NEXUS_ (Demo Tenant — Costa Rica)
- **Scale**: ~568 students, 30 teachers/faculty, 29 academic sections across 5 levels (7° to 11° year), full administrative staff, and guardian/family accounts.
- **Language**: Spanish (native Costa Rican educational terminology: _Niveles_, _Secciones_, _Periodos Lectivos_, _Cotidianas_, _Tareas_, _Pruebas_, _Asistencia_, _Encargados Legales_).

---

### 2. Multi-Tenant Architecture & Roles

NEXUS implements tenant-level isolation with strict role-based access control (RBAC):

1. **Super Administrador (Platform Level)**:
   - Multi-institution oversight, tenant provisioning, system audit logs, global configuration.
2. **Administrador Institucional (Tenant Level)**:
   - Complete school operations: faculty, student enrollment, academic structure, attendance compliance, grade period lock/unlock, reports, and tenant configuration.
3. **Docente (Teacher / Faculty)**:
   - Daily attendance recording, grading rubrics, continuous assessment, course sections, student evaluation summaries, and direct communication with students/guardians.
4. **Estudiante (Student)**:
   - Personalized student portal: timetable/schedule, current grades, attendance streak/alerts, assignments, teacher announcements, and inbox.
5. **Encargado / Familiar (Parent / Guardian)**:
   - Multi-child tracking, academic progress, attendance notifications, official circulars, and messaging with teachers/coordinators.

---

### 3. Core Functional Domains

1. **Executive Dashboard**: Real-time academic KPIs, attendance rates, grade distributions, daily schedule timeline, urgent academic alerts.
2. **Student Directory & 360° Profile**: Master list with multifaceted filters, enrollment status, guardian linkage, academic history, incident log, documents.
3. **Faculty Directory & Workload**: Teacher profiles, assigned courses/sections, weekly schedule grid, contact information.
4. **Academic Structure & Enrollment**: Grade levels (7°-11°), section assignments, curriculum subjects, academic periods (Trimestres/Semestres).
5. **Attendance Engine**: Daily roll-call matrix with quick-toggle statuses (Presente, Ausente Injustificado, Ausente Justificado, Tardía), justification workflows, monthly heatmaps.
6. **Grades & Evaluation Engine**: Weight breakdown (Trabajo Cotidiano, Tareas, Pruebas, Asistencia), grade book spreadsheet with real-time GPA calculation, grade status validation.
7. **Institutional Timetable & Calendar**: Interactive calendar, class schedules, exam schedules, institutional activities.
8. **Communications & Messaging (Omni-Inbox)**: 3-column email/messaging client with conversation threads, announcements, read receipts, and direct guardian outreach.
9. **Analytics & Institutional Reports**: Pass/fail rates, dropout risk alerts, attendance trends, grade distribution histograms, PDF/CSV report exports.
10. **Institutional Administration**: RBAC permissions, audit log, institutional branding, academic term configurations.
