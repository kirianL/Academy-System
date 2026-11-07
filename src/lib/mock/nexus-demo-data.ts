import { MatrixColumnData } from "@/components/visual/matrix-histogram";

export const INSTITUTION_SUMMARY = {
  name: "Institución Demo NEXUS",
  code: "MEP-CR-2026-DX",
  region: "Dirección Regional San José Central",
  activeCycle: "II Trimestre • Ciclo 2026",
  totalStudents: 568,
  activeTeachers: 30,
  totalSections: 29,
  levelsCount: 5,
  attendanceRate: "94,6%",
  averageGrade: "84,2",
  scholarshipFundCRC: 18450000,
};

export const ATTENDANCE_MATRIX_DATA: MatrixColumnData[] = [
  {
    month: "Enero",
    shortLabel: "ENE",
    weeks: [
      { primary: 2, secondary: 1, primaryValueLabel: "Matrícula", secondaryValueLabel: "Ajustes", periodLabel: "Sem 1 • Ene 2026" },
      { primary: 3, secondary: 1, primaryValueLabel: "Matrícula", secondaryValueLabel: "Traslados", periodLabel: "Sem 2 • Ene 2026" },
      { primary: 4, secondary: 2, primaryValueLabel: "Inducción", secondaryValueLabel: "Docentes", periodLabel: "Sem 3 • Ene 2026" },
      { primary: 5, secondary: 2, primaryValueLabel: "Preparación", secondaryValueLabel: "Comités", periodLabel: "Sem 4 • Ene 2026" },
    ],
  },
  {
    month: "Febrero",
    shortLabel: "FEB",
    weeks: [
      { primary: 8, secondary: 2, primaryValueLabel: "538 est.", secondaryValueLabel: "18 just.", periodLabel: "Sem 1 • Feb 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "546 est.", secondaryValueLabel: "14 just.", periodLabel: "Sem 2 • Feb 2026" },
      { primary: 10, secondary: 1, primaryValueLabel: "552 est.", secondaryValueLabel: "11 just.", periodLabel: "Sem 3 • Feb 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "544 est.", secondaryValueLabel: "16 just.", periodLabel: "Sem 4 • Feb 2026" },
    ],
  },
  {
    month: "Marzo",
    shortLabel: "MAR",
    weeks: [
      { primary: 9, secondary: 2, primaryValueLabel: "545 est.", secondaryValueLabel: "15 just.", periodLabel: "Sem 1 • Mar 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "551 est.", secondaryValueLabel: "12 just.", periodLabel: "Sem 2 • Mar 2026" },
      { primary: 8, secondary: 3, primaryValueLabel: "532 est.", secondaryValueLabel: "24 just.", periodLabel: "Sem 3 • Mar 2026" },
      { primary: 7, secondary: 2, primaryValueLabel: "518 est.", secondaryValueLabel: "19 just.", periodLabel: "Sem 4 • Mar 2026" },
    ],
  },
  {
    month: "Abril",
    shortLabel: "ABR",
    weeks: [
      { primary: 4, secondary: 2, primaryValueLabel: "Receso", secondaryValueLabel: "Semana Santa", periodLabel: "Sem 1 • Abr 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "542 est.", secondaryValueLabel: "18 just.", periodLabel: "Sem 2 • Abr 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "550 est.", secondaryValueLabel: "13 just.", periodLabel: "Sem 3 • Abr 2026" },
      { primary: 11, secondary: 1, primaryValueLabel: "558 est.", secondaryValueLabel: "8 just.", periodLabel: "Sem 4 • Abr 2026" },
    ],
  },
  {
    month: "Mayo",
    shortLabel: "MAY",
    weeks: [
      { primary: 9, secondary: 2, primaryValueLabel: "541 est.", secondaryValueLabel: "17 just.", periodLabel: "Sem 1 • May 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "549 est.", secondaryValueLabel: "14 just.", periodLabel: "Sem 2 • May 2026" },
      { primary: 9, secondary: 3, primaryValueLabel: "536 est.", secondaryValueLabel: "22 just.", periodLabel: "Sem 3 • May 2026" },
      { primary: 8, secondary: 2, primaryValueLabel: "530 est.", secondaryValueLabel: "18 just.", periodLabel: "Sem 4 • May 2026" },
    ],
  },
  {
    month: "Junio",
    shortLabel: "JUN",
    weeks: [
      { primary: 9, secondary: 2, primaryValueLabel: "543 est.", secondaryValueLabel: "16 just.", periodLabel: "Sem 1 • Jun 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "551 est.", secondaryValueLabel: "13 just.", periodLabel: "Jun 2026 • Sem 2" },
      { primary: 11, secondary: 1, primaryValueLabel: "556 est.", secondaryValueLabel: "9 just.", periodLabel: "Jun 2026 • Sem 3" },
      { primary: 9, secondary: 2, primaryValueLabel: "540 est.", secondaryValueLabel: "19 just.", periodLabel: "Jun 2026 • Sem 4" },
    ],
  },
  {
    month: "Julio",
    shortLabel: "JUL",
    weeks: [
      { primary: 5, secondary: 2, primaryValueLabel: "Receso", secondaryValueLabel: "Medio Periodo", periodLabel: "Sem 1 • Jul 2026" },
      { primary: 4, secondary: 2, primaryValueLabel: "Receso", secondaryValueLabel: "Medio Periodo", periodLabel: "Sem 2 • Jul 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "544 est.", secondaryValueLabel: "15 just.", periodLabel: "Sem 3 • Jul 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "550 est.", secondaryValueLabel: "12 just.", periodLabel: "Sem 4 • Jul 2026" },
    ],
  },
  {
    month: "Agosto",
    shortLabel: "AGO",
    weeks: [
      { primary: 9, secondary: 2, primaryValueLabel: "542 est.", secondaryValueLabel: "16 just.", periodLabel: "Sem 1 • Ago 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "548 est.", secondaryValueLabel: "14 just.", periodLabel: "Sem 2 • Ago 2026" },
      { primary: 10, secondary: 1, primaryValueLabel: "553 est.", secondaryValueLabel: "10 just.", periodLabel: "Sem 3 • Ago 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "539 est.", secondaryValueLabel: "18 just.", periodLabel: "Sem 4 • Ago 2026" },
    ],
  },
  {
    month: "Septiembre",
    shortLabel: "SEP",
    weeks: [
      { primary: 10, secondary: 2, primaryValueLabel: "549 est.", secondaryValueLabel: "13 just.", periodLabel: "Sem 1 • Sep 2026" },
      { primary: 11, secondary: 1, primaryValueLabel: "557 est.", secondaryValueLabel: "8 just.", periodLabel: "Sem 2 • Sep 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "541 est.", secondaryValueLabel: "17 just.", periodLabel: "Sem 3 • Sep 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "547 est.", secondaryValueLabel: "14 just.", periodLabel: "Sem 4 • Sep 2026" },
    ],
  },
  {
    month: "Octubre",
    shortLabel: "OCT",
    weeks: [
      { primary: 9, secondary: 3, primaryValueLabel: "534 est.", secondaryValueLabel: "23 just.", periodLabel: "Sem 1 • Oct 2026" },
      { primary: 10, secondary: 2, primaryValueLabel: "546 est.", secondaryValueLabel: "15 just.", periodLabel: "Sem 2 • Oct 2026" },
      { primary: 11, secondary: 1, primaryValueLabel: "555 est.", secondaryValueLabel: "9 just.", periodLabel: "Sem 3 • Oct 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "540 est.", secondaryValueLabel: "18 just.", periodLabel: "Sem 4 • Oct 2026" },
    ],
  },
  {
    month: "Noviembre",
    shortLabel: "NOV",
    weeks: [
      { primary: 10, secondary: 2, primaryValueLabel: "551 est.", secondaryValueLabel: "11 just.", periodLabel: "Sem 1 • Nov 2026" },
      { primary: 11, secondary: 1, primaryValueLabel: "559 est.", secondaryValueLabel: "7 just.", periodLabel: "Sem 2 • Nov 2026" },
      { primary: 9, secondary: 2, primaryValueLabel: "Pruebas", secondaryValueLabel: "Cierre Actas", periodLabel: "Sem 3 • Nov 2026" },
      { primary: 8, secondary: 2, primaryValueLabel: "Clausura", secondaryValueLabel: "Entrega Notas", periodLabel: "Sem 4 • Nov 2026" },
    ],
  },
  {
    month: "Diciembre",
    shortLabel: "DIC",
    weeks: [
      { primary: 5, secondary: 2, primaryValueLabel: "Graduaciones", secondaryValueLabel: "Actos Oficiales", periodLabel: "Sem 1 • Dic 2026" },
      { primary: 4, secondary: 1, primaryValueLabel: "Convocatoria", secondaryValueLabel: "Ampliación I", periodLabel: "Sem 2 • Dic 2026" },
      { primary: 3, secondary: 1, primaryValueLabel: "Cierre Anual", secondaryValueLabel: "Archivo MEP", periodLabel: "Sem 3 • Dic 2026" },
      { primary: 2, secondary: 1, primaryValueLabel: "Vacaciones", secondaryValueLabel: "Receso", periodLabel: "Sem 4 • Dic 2026" },
    ],
  },
];

export interface AcademicWorkstreamItem {
  id: string;
  stage: "revision" | "active";
  title: string;
  code: string;
  cycleTag: string;
  level: string;
  priority: string;
  dueDate: string;
  teacher: string;
  sectionsCount: number;
  updatedAgo: string;
  iconBg: string;
}

export const ACADEMIC_WORKSTREAMS: AcademicWorkstreamItem[] = [
  {
    id: "ws-1",
    stage: "revision",
    title: "Validación de Actas • Matemáticas y Física",
    code: "#ACT-101",
    cycleTag: "Educación Diversificada (10°–11°)",
    level: "10° y 11° Año",
    priority: "Impacto Alto",
    dueDate: "06 Nov, 2026",
    teacher: "M.Sc. Valeria Mora",
    sectionsCount: 11,
    updatedAgo: "Hace 2 h",
    iconBg: "#E07A2E",
  },
  {
    id: "ws-2",
    stage: "revision",
    title: "Rúbricas de Trabajo Cotidiano • Español",
    code: "#ACT-104",
    cycleTag: "III Ciclo (7°–9°)",
    level: "7°, 8° y 9° Año",
    priority: "Impacto Medio",
    dueDate: "08 Nov, 2026",
    teacher: "Lic. Carlos Brenes",
    sectionsCount: 18,
    updatedAgo: "Hace 4 h",
    iconBg: "#18181B",
  },
  {
    id: "ws-3",
    stage: "revision",
    title: "Justificación de Ausencias y Becas IMAS",
    code: "#ASI-209",
    cycleTag: "Educación Diversificada (10°–11°)",
    level: "Todos los niveles",
    priority: "Prioritario",
    dueDate: "05 Nov, 2026",
    teacher: "Depto. Orientación",
    sectionsCount: 29,
    updatedAgo: "Hace 35 min",
    iconBg: "#2563EB",
  },
  {
    id: "ws-4",
    stage: "active",
    title: "II Prueba Parcial Unificada • Ciencias",
    code: "#EVA-312",
    cycleTag: "III Ciclo (7°–9°)",
    level: "8° y 9° Año",
    priority: "En Ejecución",
    dueDate: "12 Nov, 2026",
    teacher: "Licda. Sofía Vargas",
    sectionsCount: 12,
    updatedAgo: "Hace 1 h",
    iconBg: "#059669",
  },
  {
    id: "ws-5",
    stage: "active",
    title: "Proyecto Feria Científica y Robótica",
    code: "#PRY-118",
    cycleTag: "Educación Diversificada (10°–11°)",
    level: "10° Año (Secc. 10-1 a 10-6)",
    priority: "Impacto Medio",
    dueDate: "18 Nov, 2026",
    teacher: "Ing. Diego Castro",
    sectionsCount: 6,
    updatedAgo: "Hace 5 h",
    iconBg: "#7C3AED",
  },
  {
    id: "ws-6",
    stage: "active",
    title: "Nivelación Preventiva • Inglés Conversacional",
    code: "#NIV-402",
    cycleTag: "Educación Diversificada (10°–11°)",
    level: "11° Año • Bachillerato",
    priority: "Crítico",
    dueDate: "14 Nov, 2026",
    teacher: "Prof. Andrea Solano",
    sectionsCount: 5,
    updatedAgo: "Hace 3 h",
    iconBg: "#18181B",
  },
];

export interface MantraAcademicProject {
  id: string;
  tab: "active" | "negotiating" | "archived";
  department: string;
  dateLabel: string;
  statusLabel: string;
  title: string;
  tags: string[];
  platformLabel: string;
  budgetRangeCRC: string;
  dueDateLabel: string;
  messagesLabel: string;
  unreadMessages: boolean;
  bannerVariant: "stem" | "bachillerato" | "becas";
}

export const MANTRA_ACADEMIC_PROJECTS: MantraAcademicProject[] = [
  {
    id: "mp-1",
    tab: "active",
    department: "Depto. Ciencias y Robótica",
    dateLabel: "06 Nov, 2026",
    statusLabel: "Activo",
    title: "Feria Científica y Laboratorios STEM 2026",
    tags: ["Educación Diversificada", "Robótica", "PRONIE-MEP"],
    platformLabel: "SIRIME • Laboratorio #2",
    budgetRangeCRC: "₡1.850.000 - ₡2.400.000",
    dueDateLabel: "Entrega 18 Noviembre, 2026",
    messagesLabel: "2 Mensajes nuevos",
    unreadMessages: true,
    bannerVariant: "stem",
  },
  {
    id: "mp-2",
    tab: "active",
    department: "Coordinación 11° Nivel",
    dateLabel: "08 Nov, 2026",
    statusLabel: "Activo",
    title: "Simulacro de Pruebas Nacionales Estandarizadas",
    tags: ["Bachillerato", "11° Nivel", "DGEC MEP"],
    platformLabel: "Plataforma Digital MEP",
    budgetRangeCRC: "₡920.000 - ₡1.150.000",
    dueDateLabel: "Entrega 25 Noviembre, 2026",
    messagesLabel: "4 Mensajes nuevos",
    unreadMessages: true,
    bannerVariant: "bachillerato",
  },
  {
    id: "mp-3",
    tab: "active",
    department: "Junta Administrativa",
    dateLabel: "04 Nov, 2026",
    statusLabel: "Activo",
    title: "Programa de Comedor y Becas Estudiantiles PANEA",
    tags: ["Bienestar Estudiantil", "IMAS", "III Ciclo"],
    platformLabel: "Tesorería • Junta NEXUS",
    budgetRangeCRC: "₡8.450.000 - ₡10.000.000",
    dueDateLabel: "Cierre 30 Noviembre, 2026",
    messagesLabel: "1 Mensaje nuevo",
    unreadMessages: true,
    bannerVariant: "becas",
  },
  {
    id: "mp-4",
    tab: "negotiating",
    department: "Comité de Evaluación",
    dateLabel: "09 Nov, 2026",
    statusLabel: "En Revisión",
    title: "Adecuaciones Curriculares Significativas • III Ciclo",
    tags: ["Orientación", "7° a 9° Nivel", "CENAREC"],
    platformLabel: "Expediente Psicopedagógico",
    budgetRangeCRC: "₡640.000 - ₡850.000",
    dueDateLabel: "Revisión 14 Noviembre, 2026",
    messagesLabel: "3 Observaciones docentes",
    unreadMessages: true,
    bannerVariant: "stem",
  },
  {
    id: "mp-5",
    tab: "negotiating",
    department: "Depto. Lenguas Extranjeras",
    dateLabel: "10 Nov, 2026",
    statusLabel: "En Revisión",
    title: "Certificación Lingüística B2 • Secciones Bilingües",
    tags: ["Inglés Conversacional", "10°–11°", "Alianza Cultural"],
    platformLabel: "Laboratorio de Idiomas",
    budgetRangeCRC: "₡1.200.000 - ₡1.600.000",
    dueDateLabel: "Revisión 20 Noviembre, 2026",
    messagesLabel: "2 Mensajes nuevos",
    unreadMessages: true,
    bannerVariant: "bachillerato",
  },
  {
    id: "mp-6",
    tab: "archived",
    department: "Dirección Académica",
    dateLabel: "15 Ago, 2026",
    statusLabel: "Archivado",
    title: "Cierre de Actas Oficiales • I Trimestre Lectivo 2026",
    tags: ["Actas Firmadas", "29 Secciones", "Auditoría MEP"],
    platformLabel: "Archivo Institucional NEXUS",
    budgetRangeCRC: "₡450.000 ejecutados",
    dueDateLabel: "Finalizado 28 Agosto, 2026",
    messagesLabel: "Sin pendientes",
    unreadMessages: false,
    bannerVariant: "becas",
  },
];

export const PEDAGOGICAL_SUGGESTIONS = [
  {
    id: "sug-1",
    dotColor: "#9333EA",
    category: "Requiere validación de acta",
    highlight: "Sección 10-2 • Física Elemental (pendiente firma docente)",
  },
  {
    id: "sug-2",
    dotColor: "#3B82F6",
    category: "Variación en asistencia semanal",
    highlight: "Sección 7-2 registra 4 ausencias sin justificar hoy",
  },
  {
    id: "sug-3",
    dotColor: "#E11D48",
    category: "Seguimiento psicopedagógico prioritario",
    highlight: "6 estudiantes en 9° año con promedio < 70,0 en Matemáticas",
  },
];

export interface ThreadReplyItem {
  id: string;
  senderName: string;
  senderEmail: string;
  isMe: boolean;
  timeLabel: string;
  fullDateLabel: string;
  body: string;
  attachment?: {
    name: string;
    size: string;
    type: "pdf" | "pptx" | "xlsx" | "docx" | "image" | "file" | string;
    url?: string;
  };
}

export interface CommunicationMessage {
  id: string;
  senderName: string;
  senderEmail: string;
  senderAvatarText: string;
  senderAvatarBg: string;
  verified: boolean;
  timeLabel: string;
  fullDateLabel: string;
  subject: string;
  snippet: string;
  body: string[];
  category: "inbox" | "sent" | "drafts";
  isUnread: boolean;
  isStarred?: boolean;
  attachment?: {
    name: string;
    size: string;
    type: "pdf" | "pptx" | "xlsx" | "docx" | "image" | "file" | string;
    url?: string;
  };
  replies?: ThreadReplyItem[];
}

export const INITIAL_COMMUNICATIONS: CommunicationMessage[] = [
  {
    id: "msg-1",
    senderName: "Rico Oktananda",
    senderEmail: "rico.oktananda1@gmail.com",
    senderAvatarText: "RO",
    senderAvatarBg: "#2563EB",
    verified: true,
    timeLabel: "05.16",
    fullDateLabel: "Hoy a las 05:16 AM • Feedback Oficial",
    subject: "We Need Your UX Feedback on Our Product Experience",
    snippet:
      "We're refining our product and need your insights on our user experience (UX) desig...",
    body: [
      "Hi Team,",
      "We're refining our product and need your insights on our user experience (UX) design. Your feedback is crucial in helping us improve our platform and deliver a seamless, high-performance experience.",
      "Please review the attached presentation slides and share your impressions regarding the information architecture, typographic balance, and interaction states.",
      "Best regards,",
      "Rico Oktananda",
    ],
    category: "inbox",
    isUnread: true,
    attachment: {
      name: "designpr.pptx",
      size: "4.2 MB",
      type: "pptx",
    },
    replies: [
      {
        id: "rep-1-1",
        senderName: "M.Sc. Mariana Solís (Tú)",
        senderEmail: "direccion@nexus.ed.cr",
        isMe: true,
        timeLabel: "06:10",
        fullDateLabel: "Hoy a las 06:10 AM",
        body: "Hola Rico, he revisado la estructura preliminar. La jerarquía tipográfica es clara y los estados de interacción responden con fluidez.",
      },
    ],
  },
  {
    id: "msg-2",
    senderName: "Alicia from Deel",
    senderEmail: "alicia@deel.support",
    senderAvatarText: "deel.",
    senderAvatarBg: "#7C3AED",
    verified: true,
    timeLabel: "June 29",
    fullDateLabel: "29 de Junio, 2026 • 11:42 AM",
    subject: "Your money is on the way! Your Deel withdrawal is all set",
    snippet:
      "Your money is on the way! Your Deel withdrawal is all set, and your money is on i...",
    body: [
      "Hi Mariana,",
      "Great news! Your funds withdrawal of ₡18.450.000 has been successfully initiated to your institutional bank account. The funds should arrive according to standard banking clearing times.",
      "You can download your receipt and statement of account directly from your compliance tab.",
      "Best regards,",
      "Alicia & the Deel Support Team",
    ],
    category: "inbox",
    isUnread: false,
    attachment: {
      name: "Deel_Withdrawal_Receipt_June2026.pdf",
      size: "890 KB",
      type: "pdf",
    },
  },
  {
    id: "msg-3",
    senderName: "Substack Read",
    senderEmail: "read@substack.com",
    senderAvatarText: "SR",
    senderAvatarBg: "#EA580C",
    verified: true,
    timeLabel: "June 29",
    fullDateLabel: "29 de Junio, 2026 • 09:15 AM",
    subject: "Research as a leisure activity, solstices & academic systems",
    snippet:
      "Research as a leisure activity, solstics, modern architectural patterns in educational technology...",
    body: [
      "Welcome to this week's edition of Substack Reads.",
      "In this feature, we explore how thoughtful interaction design and micro-typography transform institutional software from rigid databases into fluid, tactile work environments.",
      "Read the full article online or share with your department leads.",
    ],
    category: "inbox",
    isUnread: false,
  },
  {
    id: "msg-4",
    senderName: "M.Sc. Valeria Mora • Matemáticas",
    senderEmail: "vmora@nexus.ed.cr",
    senderAvatarText: "VM",
    senderAvatarBg: "#059669",
    verified: true,
    timeLabel: "Ayer",
    fullDateLabel: "Ayer a las 04:30 PM • 10° Nivel",
    subject: "Validación de Actas y Cierre de Promedios II Trimestre",
    snippet:
      "Se ha completado el ingreso del 100% de calificaciones para 10-1 a 10-6. Pendiente firma de dirección...",
    body: [
      "Estimada M.Sc. Mariana Solís,",
      "Le notifico que las actas correspondientes a Matemáticas y Física han sido cotejadas y firmadas por los coordinadores de nivel. Solicitamos la validación digital institucional para el envío a SIRIME.",
    ],
    category: "inbox",
    isUnread: true,
    attachment: {
      name: "Acta_Consolidada_10_Nivel_MEP_2026.pdf",
      size: "2.4 MB",
      type: "pdf",
    },
    replies: [
      {
        id: "rep-4-1",
        senderName: "M.Sc. Mariana Solís (Tú)",
        senderEmail: "direccion@nexus.ed.cr",
        isMe: true,
        timeLabel: "Ayer 17:15",
        fullDateLabel: "Ayer a las 05:15 PM",
        body: "Estimada colega Valeria: Recibidas las actas de 10° año. Procedo con la firma digital institucional y el envío al padrón de SIRIME.",
      },
    ],
  },
  {
    id: "msg-5",
    senderName: "Despacho Ministerial MEP",
    senderEmail: "circulares@mep.go.cr",
    senderAvatarText: "MEP",
    senderAvatarBg: "#18181B",
    verified: true,
    timeLabel: "14 Jul",
    fullDateLabel: "14 de Julio, 2026 • 08:00 AM",
    subject: "Circular DVM-AC-042-2026: Calendario Oficial de Cierre Lectivo",
    snippet:
      "Directriz oficial del Ministerio de Educación Pública sobre periodos de evaluación sumativa...",
    body: [
      "A las Direcciones de Centros Educativos de todo el país:",
      "Por este medio se comunica la directriz ministerial relativa al cronograma de entrega de actas oficiales del presente ciclo lectivo.",
    ],
    category: "inbox",
    isUnread: false,
  },
];

