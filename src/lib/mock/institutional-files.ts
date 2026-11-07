export interface InstitutionalFile {
  id: string;
  name: string;
  extension: "pdf" | "xlsx" | "docx" | "pptx" | "image" | "file";
  size: string;
  sizeBytes: number;
  folderId: string;
  addedBy: {
    name: string;
    email: string;
    avatarSeed: string;
    role: string;
  };
  updatedAt: string;
  tags: string[];
  mepOfficial?: boolean;
}

export interface InstitutionalFolder {
  id: string;
  name: string;
  parentId?: string;
  description?: string;
  fileCount: number;
  brandIcons: ("pdf" | "xlsx" | "docx" | "pptx" | "drive" | "notion")[];
  tags: string[];
  subfolderIds?: string[];
}

export const INITIAL_FOLDERS: InstitutionalFolder[] = [
  {
    id: "f-general",
    name: "General Institucional",
    description: "Normativa general, organigrama y circulares de la Dirección.",
    fileCount: 18,
    brandIcons: ["notion", "drive", "pdf"],
    tags: ["MEP", "Dirección", "Oficial"],
    subfolderIds: ["f-circulares", "f-actas", "f-expedientes"],
  },
  {
    id: "f-circulares",
    name: "Circulares y Directrices MEP",
    parentId: "f-general",
    description: "Lineamientos oficiales emitidos por el Ministerio de Educación Pública.",
    fileCount: 8,
    brandIcons: ["notion", "drive", "pdf"],
    tags: ["MEP", "Normativa", "2026"],
    subfolderIds: ["f-circulares-2026", "f-protocolos"],
  },
  {
    id: "f-circulares-2026",
    name: "Circulares 2026",
    parentId: "f-circulares",
    description: "Directrices para el periodo lectivo en curso.",
    fileCount: 5,
    brandIcons: ["pdf"],
    tags: ["2026", "Trimestral"],
  },
  {
    id: "f-protocolos",
    name: "Protocolos Oficiales",
    parentId: "f-circulares",
    description: "Manuales de convivencia, rutas de evacuación y salud escolar.",
    fileCount: 3,
    brandIcons: ["pdf", "docx"],
    tags: ["Protocolo", "Seguridad"],
  },
  {
    id: "f-actas",
    name: "Actas de Calificaciones",
    parentId: "f-general",
    description: "Padrón oficial y actas consolidadas firmadas digitalmente.",
    fileCount: 6,
    brandIcons: ["notion", "xlsx", "docx"],
    tags: ["Evaluación", "SIRIME"],
  },
  {
    id: "f-expedientes",
    name: "Expedientes y Padrón",
    parentId: "f-general",
    description: "Registro de matrícula y expedientes administrativos.",
    fileCount: 4,
    brandIcons: ["docx", "xlsx", "pdf"],
    tags: ["Matrícula", "Estudiantes"],
  },
  {
    id: "f-comites",
    name: "Comités y Comisiones",
    description: "Acuerdos y actas de los comités institucionales.",
    fileCount: 12,
    brandIcons: ["docx", "pdf", "xlsx"],
    tags: ["Comités", "Acuerdos"],
    subfolderIds: ["f-evaluacion", "f-becas"],
  },
  {
    id: "f-evaluacion",
    name: "Comité de Evaluación",
    parentId: "f-comites",
    description: "Criterios técnicos de evaluación sumativa y formativa.",
    fileCount: 7,
    brandIcons: ["pdf", "docx"],
    tags: ["Evaluación", "Docentes"],
  },
  {
    id: "f-becas",
    name: "Becas y Comedor Escolar",
    parentId: "f-comites",
    description: "Padrón de beneficiarios y actas del comedor estudiantil.",
    fileCount: 5,
    brandIcons: ["xlsx", "pdf"],
    tags: ["Bienestar", "Comedor"],
  },
  {
    id: "f-pedagogicos",
    name: "Recursos Pedagógicos",
    description: "Materiales didácticos y programaciones curriculares por departamento.",
    fileCount: 15,
    brandIcons: ["pptx", "pdf", "docx"],
    tags: ["Docencia", "Curricular"],
  },
  {
    id: "f-plantillas",
    name: "Plantillas y Formularios",
    description: "Formatos oficiales aprobados para permisos, circulares y actas.",
    fileCount: 9,
    brandIcons: ["docx", "xlsx"],
    tags: ["Formatos", "Descargas"],
  },
];

export const INITIAL_FILES: InstitutionalFile[] = [
  {
    id: "file-gen-1",
    name: "Reglamento_Interno_Institucional_2026.pdf",
    extension: "pdf",
    size: "2.4 MB",
    sizeBytes: 2516582,
    folderId: "f-general",
    addedBy: {
      name: "M.Sc. Mariana Solís",
      email: "direccion@nexus.ed.cr",
      avatarSeed: "mariana-solis-directora",
      role: "Dirección Institucional",
    },
    updatedAt: "Hoy a las 09:15 AM",
    tags: ["Dirección", "Reglamento", "Oficial"],
    mepOfficial: true,
  },
  {
    id: "file-gen-2",
    name: "Plan_Anual_Operativo_PAO_2026.docx",
    extension: "docx",
    size: "820 KB",
    sizeBytes: 839680,
    folderId: "f-general",
    addedBy: {
      name: "Rico Oktananda",
      email: "rico.oktananda1@gmail.com",
      avatarSeed: "rico-oktananda",
      role: "Coordinación Pedagógica",
    },
    updatedAt: "Hoy a las 08:45 AM",
    tags: ["Planificación", "PAO", "Docencia"],
  },
  {
    id: "file-gen-3",
    name: "Presupuesto_General_Colegio_2026.xlsx",
    extension: "xlsx",
    size: "1.2 MB",
    sizeBytes: 1258291,
    folderId: "f-general",
    addedBy: {
      name: "Alicia from Deel",
      email: "alicia@deel.support",
      avatarSeed: "alicia-support",
      role: "Gestión de Planilla y Presupuesto",
    },
    updatedAt: "Ayer a las 04:20 PM",
    tags: ["Presupuesto", "Junta", "Finanzas"],
    mepOfficial: true,
  },
  {
    id: "file-cir-1",
    name: "Circular_DVM_AC_014_Evaluacion_Formativa.pdf",
    extension: "pdf",
    size: "1.1 MB",
    sizeBytes: 1153433,
    folderId: "f-circulares",
    addedBy: {
      name: "Despacho Ministerial MEP",
      email: "circulares@mep.go.cr",
      avatarSeed: "mep-oficial",
      role: "Ministerio de Educación",
    },
    updatedAt: "Hoy a las 07:15 AM",
    tags: ["MEP", "Evaluación", "2026"],
    mepOfficial: true,
  },
  {
    id: "file-cir-2",
    name: "Guia_Aplicacion_Pruebas_Estandarizadas.docx",
    extension: "docx",
    size: "490 KB",
    sizeBytes: 501760,
    folderId: "f-circulares",
    addedBy: {
      name: "M.Sc. Valeria Mora",
      email: "vmora@nexus.ed.cr",
      avatarSeed: "valeria-mora",
      role: "Comité de Evaluación",
    },
    updatedAt: "15 Jul 2026",
    tags: ["Pruebas", "Lineamientos"],
  },
  {
    id: "file-1",
    name: "Circular_MEP_CR_2026_Lineamientos.pdf",
    extension: "pdf",
    size: "1.8 MB",
    sizeBytes: 1887436,
    folderId: "f-circulares-2026",
    addedBy: {
      name: "Despacho Ministerial MEP",
      email: "circulares@mep.go.cr",
      avatarSeed: "mep-oficial",
      role: "Ministerio de Educación",
    },
    updatedAt: "Hoy a las 08:30 AM",
    tags: ["MEP", "Oficial", "2026"],
    mepOfficial: true,
  },
  {
    id: "file-2",
    name: "Acta_Consolidada_Seccion_10_2.xlsx",
    extension: "xlsx",
    size: "640 KB",
    sizeBytes: 655360,
    folderId: "f-actas",
    addedBy: {
      name: "M.Sc. Valeria Mora",
      email: "vmora@nexus.ed.cr",
      avatarSeed: "valeria-mora",
      role: "Docente • Matemáticas",
    },
    updatedAt: "Hoy a las 06:10 AM",
    tags: ["10-2", "Calificaciones", "Firmada"],
    mepOfficial: true,
  },
  {
    id: "file-3",
    name: "Protocolo_Evacuacion_Comite_Seguridad.pdf",
    extension: "pdf",
    size: "3.2 MB",
    sizeBytes: 3355443,
    folderId: "f-protocolos",
    addedBy: {
      name: "M.Sc. Mariana Solís",
      email: "direccion@nexus.ed.cr",
      avatarSeed: "mariana-solis-directora",
      role: "Dirección Institucional",
    },
    updatedAt: "Ayer a las 03:45 PM",
    tags: ["Seguridad", "Emergencias"],
    mepOfficial: true,
  },
  {
    id: "file-4",
    name: "Presentacion_Induccion_Docente_2026.pptx",
    extension: "pptx",
    size: "4.2 MB",
    sizeBytes: 4404019,
    folderId: "f-pedagogicos",
    addedBy: {
      name: "Rico Oktananda",
      email: "rico.oktananda1@gmail.com",
      avatarSeed: "rico-oktananda",
      role: "Coordinación Pedagógica",
    },
    updatedAt: "Ayer a las 11:20 AM",
    tags: ["Inducción", "Docentes"],
  },
  {
    id: "file-5",
    name: "Formato_Oficial_Acta_Reunion_MEP.docx",
    extension: "docx",
    size: "245 KB",
    sizeBytes: 250880,
    folderId: "f-plantillas",
    addedBy: {
      name: "M.Sc. Mariana Solís",
      email: "direccion@nexus.ed.cr",
      avatarSeed: "mariana-solis-directora",
      role: "Dirección Institucional",
    },
    updatedAt: "14 Jul 2026",
    tags: ["Plantilla", "Actas"],
    mepOfficial: true,
  },
  {
    id: "file-6",
    name: "Padron_Estudiantes_Matricula_2026.xlsx",
    extension: "xlsx",
    size: "1.1 MB",
    sizeBytes: 1153433,
    folderId: "f-expedientes",
    addedBy: {
      name: "M.Sc. Mariana Solís",
      email: "direccion@nexus.ed.cr",
      avatarSeed: "mariana-solis-directora",
      role: "Dirección Institucional",
    },
    updatedAt: "12 Jul 2026",
    tags: ["Matrícula", "SIRIME"],
    mepOfficial: true,
  },
  {
    id: "file-7",
    name: "Informe_Tecnico_Evaluacion_Formativa.docx",
    extension: "docx",
    size: "520 KB",
    sizeBytes: 532480,
    folderId: "f-evaluacion",
    addedBy: {
      name: "M.Sc. Valeria Mora",
      email: "vmora@nexus.ed.cr",
      avatarSeed: "valeria-mora",
      role: "Comité de Evaluación",
    },
    updatedAt: "10 Jul 2026",
    tags: ["Evaluación", "Informe"],
  },
  {
    id: "file-8",
    name: "Lista_Beneficiarios_Comedor_Junio.xlsx",
    extension: "xlsx",
    size: "380 KB",
    sizeBytes: 389120,
    folderId: "f-becas",
    addedBy: {
      name: "Alicia from Deel",
      email: "alicia@deel.support",
      avatarSeed: "alicia-support",
      role: "Gestión de Planilla",
    },
    updatedAt: "29 Jun 2026",
    tags: ["Comedor", "Becas"],
  },
];
