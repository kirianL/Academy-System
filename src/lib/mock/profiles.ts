import type { AvailabilityStatusType } from "@/lib/profile-store";

export interface PersonProfile {
  email: string;
  name: string;
  handle: string;
  role: string;
  department: string;
  bio: string;
  location: string;
  joined: string;
  phone?: string;
  officeHours?: string;
  statusType?: AvailabilityStatusType;
  statusText?: string;
  stats: { label: string; value: string }[];
  tags: string[];
}

const PROFILES: Record<string, PersonProfile> = {
  "direccion@nexus.ed.cr": {
    email: "direccion@nexus.ed.cr",
    name: "M.Sc. Mariana Solís",
    handle: "msolis",
    role: "Directora Institucional",
    department: "Dirección General",
    bio: "Gestión académica y administrativa del centro educativo. Enfocada en procesos de evaluación transparentes y acompañamiento docente.",
    location: "San José • Edificio Principal, Oficina 201",
    joined: "Desde febrero 2019",
    phone: "+506 2222-0101",
    officeHours: "Lun – Vie • 7:30 a.m. a 3:30 p.m.",
    statusType: "available",
    statusText: "Disponible para consultas",
    stats: [
      { label: "Secciones", value: "29" },
      { label: "Docentes", value: "36" },
      { label: "Actas firmadas", value: "214" },
    ],
    tags: ["Dirección", "Evaluación", "SIRIME"],
  },
  "vmora@nexus.ed.cr": {
    email: "vmora@nexus.ed.cr",
    name: "M.Sc. Valeria Mora",
    handle: "vmora",
    role: "Docente Titular de Matemáticas",
    department: "Departamento de Ciencias Exactas",
    bio: "Coordinadora de 10° nivel. Diseño de pruebas unificadas y estrategias de nivelación para Bachillerato.",
    location: "Heredia • Pabellón B, Sala 104",
    joined: "Desde marzo 2016",
    phone: "+506 2222-0144",
    officeHours: "Mar y Jue • 1:00 p.m. a 3:15 p.m.",
    statusType: "focus",
    statusText: "Cierre de actas 10° nivel",
    stats: [
      { label: "Secciones", value: "6" },
      { label: "Estudiantes", value: "182" },
      { label: "Promedio", value: "84,6" },
    ],
    tags: ["Matemáticas", "10° Nivel", "Coordinación"],
  },
  "circulares@mep.go.cr": {
    email: "circulares@mep.go.cr",
    name: "Despacho Ministerial MEP",
    handle: "mep",
    role: "Comunicaciones Oficiales",
    department: "Ministerio de Educación Pública",
    bio: "Canal oficial de circulares, directrices y calendarios del Ministerio de Educación Pública.",
    location: "San José, Costa Rica",
    joined: "Cuenta institucional",
    officeHours: "Lun – Vie • 8:00 a.m. a 4:00 p.m.",
    statusType: "available",
    statusText: "Recepción de actas activa",
    stats: [
      { label: "Circulares 2026", value: "42" },
      { label: "Centros", value: "4.6k" },
    ],
    tags: ["Circulares", "Calendario lectivo"],
  },
};

export function getProfile(email: string, fallbackName?: string): PersonProfile {
  const found = PROFILES[email];
  if (found) return found;
  const name = fallbackName ?? email.split("@")[0];
  return {
    email,
    name,
    handle: email.split("@")[0].replace(/[^a-z0-9]/gi, "").toLowerCase(),
    role: "Contacto externo",
    department: email.split("@")[1] ?? "Organización externa",
    bio: "Contacto registrado en la bandeja de comunicaciones institucionales.",
    location: "Comunicación digital",
    joined: "Contacto desde 2026",
    officeHours: "Horario comercial",
    statusType: "available",
    statusText: "Canal activo",
    stats: [{ label: "Mensajes", value: "1" }],
    tags: ["Externo"],
  };
}
