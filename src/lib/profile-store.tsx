"use client";

import * as React from "react";

export const ME_EMAIL = "direccion@nexus.ed.cr";
export const ME_SEEDS = new Set(["mariana-solis-directora", ME_EMAIL]);

export const AVATAR_OPTIONS = {
  hair: [
    "short",
    "medium",
    "long",
    "curly",
    "mohawk",
    "mediumCap",
    "curlyBandana",
    "longBeanie",
  ],
  eyes: [
    "standard",
    "opened",
    "apathetic",
    "glasses",
    "roundSunglasses",
    "heartSunglasses",
    "matrixSunglasses",
  ],
  mouth: [
    "happy",
    "meh",
    "apathetic",
    "confused",
    "mustache",
    "bristle1",
    "bristle2",
    "beard",
  ],
  body: [
    "tshirt1",
    "tshirt2",
    "overshirt1",
    "overshirt2",
    "hoodie",
    "pufferJacket",
    "overall",
  ],
  faceDetails: ["none", "freckles", "blush", "mole", "dimples", "bandaid"],
  accessory: [
    "none",
    "earringsStud",
    "earringsHoop",
    "necklace",
    "headphones",
    "lapelPin",
  ],
} as const;

export const AVATAR_OPTION_LABELS: Record<string, Record<string, string>> = {
  hair: {
    short: "Corto clásico",
    medium: "Medio lacio",
    long: "Largo suelto",
    curly: "Rizado natural",
    mohawk: "Cresta moderna",
    mediumCap: "Gorra urbana",
    curlyBandana: "Bandana rizada",
    longBeanie: "Gorro beanie",
  },
  eyes: {
    standard: "Mirada serena",
    opened: "Expresivos",
    apathetic: "Relajados",
    glasses: "Lentes ópticos",
    roundSunglasses: "Sol redondos",
    heartSunglasses: "Sol corazón",
    matrixSunglasses: "Sol futuristas",
  },
  mouth: {
    happy: "Sonrisa cálida",
    meh: "Gesto sutil",
    apathetic: "Línea serena",
    confused: "Pensativo",
    mustache: "Bigote clásico",
    bristle1: "Barba 3 días",
    bristle2: "Barba perfilada",
    beard: "Barba completa",
  },
  body: {
    tshirt1: "Camiseta gráfica",
    tshirt2: "Camiseta básica",
    overshirt1: "Sobrecamisa",
    overshirt2: "Chaqueta formal",
    hoodie: "Hoodie casual",
    pufferJacket: "Chaqueta puffer",
    overall: "Overol estudio",
  },
  faceDetails: {
    none: "Natural",
    freckles: "Pecas suaves",
    blush: "Rubor cálido",
    mole: "Lunar clásico",
    dimples: "Hoyuelos",
    bandaid: "Curita nasal",
  },
  accessory: {
    none: "Sin accesorio",
    earringsStud: "Aretes minimal",
    earringsHoop: "Argollas",
    necklace: "Collar cadena",
    headphones: "Audífonos",
    lapelPin: "Pin académico",
  },
};

export const AVATAR_COLORS = {
  hairColor: [
    "#18181B",
    "#3B2618",
    "#6B4423",
    "#9A5B25",
    "#C9A15B",
    "#D8C3A5",
    "#8C3B2B",
    "#3A486B",
    "#1A4730",
    "#5B7FBF",
    "#6D28D9",
    "#71717A",
  ],
  eyesColor: [
    "#18181B",
    "#4A2E1B",
    "#1E3A8A",
    "#14532D",
    "#7F1D1D",
    "#475569",
    "#92400E",
    "#581C87",
  ],
  mouthColor: [
    "#18181B",
    "#3B2618",
    "#5C3D2E",
    "#7C4728",
    "#8B6B4A",
    "#52525B",
    "#71717A",
    "#27272A",
  ],
  headColor: [
    "#FDE7D6",
    "#F6D7C3",
    "#F5C09B",
    "#EBC0A0",
    "#DBA472",
    "#C98E6A",
    "#A86F4C",
    "#8C5A4A",
    "#734524",
    "#4E2F1B",
  ],
  bodyColor: [
    "#18181B",
    "#2D4A3E",
    "#1C2845",
    "#3F3F46",
    "#7C2D12",
    "#1E3A8A",
    "#365314",
    "#581C87",
    "#831843",
    "#0F766E",
    "#B45309",
    "#C2A27A",
  ],
  accessoryColor: [
    "#D97706",
    "#94A3B8",
    "#18181B",
    "#0284C7",
    "#059669",
    "#E11D48",
    "#7C3AED",
    "#F8FAFC",
  ],
  backgroundColor: [
    "#F3E8FF",
    "#FEF3C7",
    "#DBEAFE",
    "#FFEDD5",
    "#ECFDF5",
    "#FCE7F3",
    "#E0E7FF",
    "#F1F5F9",
    "#FAF5EF",
    "#E2F2EA",
    "#FDE68A",
    "#DDD6FE",
  ],
} as const;

export type AvatarOverrides = Partial<{
  hair: (typeof AVATAR_OPTIONS.hair)[number];
  eyes: (typeof AVATAR_OPTIONS.eyes)[number];
  mouth: (typeof AVATAR_OPTIONS.mouth)[number];
  body: (typeof AVATAR_OPTIONS.body)[number];
  faceDetails: (typeof AVATAR_OPTIONS.faceDetails)[number];
  accessory: (typeof AVATAR_OPTIONS.accessory)[number];
  hairColor: string;
  eyesColor: string;
  mouthColor: string;
  headColor: string;
  bodyColor: string;
  accessoryColor: string;
  backgroundColor: string;
}>;

export type BannerThemeId =
  | "auto"
  | "sand"
  | "sage"
  | "amber"
  | "slate"
  | "terracotta"
  | "obsidian";

export type BannerPatternId = "grid" | "dots" | "waves" | "clean";

export type AvailabilityStatusType = "available" | "busy" | "focus" | "away";

export const BANNER_THEME_OPTIONS: {
  id: BannerThemeId;
  label: string;
  swatch: string;
}[] = [
  { id: "auto", label: "Automático", swatch: "#C9D8B6" },
  { id: "sand", label: "Piedra cálida", swatch: "#DFD8CA" },
  { id: "sage", label: "Salvia", swatch: "#C2DFD3" },
  { id: "amber", label: "Ámbar", swatch: "#F5CE9B" },
  { id: "slate", label: "Bruma", swatch: "#C7D6EC" },
  { id: "terracotta", label: "Arcilla", swatch: "#EABFB0" },
  { id: "obsidian", label: "Grafito", swatch: "#27272A" },
];

export const BANNER_PATTERN_OPTIONS: {
  id: BannerPatternId;
  label: string;
}[] = [
  { id: "grid", label: "Retícula" },
  { id: "dots", label: "Puntos" },
  { id: "waves", label: "Líneas" },
  { id: "clean", label: "Liso" },
];

export const AVAILABILITY_STATUS_OPTIONS: {
  id: AvailabilityStatusType;
  label: string;
  defaultText: string;
  dotColor: string;
}[] = [
  {
    id: "available",
    label: "Disponible",
    defaultText: "Disponible para consultas",
    dotColor: "#059669",
  },
  {
    id: "busy",
    label: "En reunión",
    defaultText: "En sesión de consejo académico",
    dotColor: "#D97706",
  },
  {
    id: "focus",
    label: "En revisión",
    defaultText: "Revisión de actas trimestrales",
    dotColor: "#18181B",
  },
  {
    id: "away",
    label: "Ausente",
    defaultText: "Fuera de oficina",
    dotColor: "#A19E95",
  },
];

export interface CustomProfileData {
  name: string;
  role: string;
  department: string;
  bio: string;
  location: string;
  phone: string;
  officeHours: string;
  statusType: AvailabilityStatusType;
  statusText: string;
  bannerTheme: BannerThemeId;
  bannerPattern: BannerPatternId;
  bannerImage?: string;
  signature: string;
  useSignature: boolean;
  tags: string[];
}

export const DEFAULT_MY_PROFILE: CustomProfileData = {
  name: "M.Sc. Mariana Solís",
  role: "Directora Institucional",
  department: "Dirección General",
  bio: "Gestión académica y administrativa del centro educativo. Enfocada en procesos de evaluación transparentes y acompañamiento docente.",
  location: "San José • Edificio Principal, Oficina 201",
  phone: "+506 2222-0101",
  officeHours: "Lun – Vie • 7:30 a.m. a 3:30 p.m.",
  statusType: "available",
  statusText: "Disponible para consultas",
  bannerTheme: "auto",
  bannerPattern: "grid",
  signature: "Atentamente,\nM.Sc. Mariana Solís • Dirección General",
  useSignature: true,
  tags: ["Dirección", "Evaluación", "SIRIME"],
};

interface ProfileStore {
  myAvatar: AvatarOverrides;
  setMyAvatar: (v: AvatarOverrides) => void;
  myProfile: CustomProfileData;
  setMyProfile: (v: Partial<CustomProfileData>) => void;
  resetMyProfile: () => void;
}

const Ctx = React.createContext<ProfileStore>({
  myAvatar: {},
  setMyAvatar: () => {},
  myProfile: DEFAULT_MY_PROFILE,
  setMyProfile: () => {},
  resetMyProfile: () => {},
});

const AVATAR_KEY = "academic.myAvatar.v2";
const PROFILE_KEY = "academic.myProfile.v1";

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [myAvatar, setAvatarState] = React.useState<AvatarOverrides>({});
  const [myProfile, setProfileState] =
    React.useState<CustomProfileData>(DEFAULT_MY_PROFILE);

  React.useEffect(() => {
    try {
      const rawAvatar =
        localStorage.getItem(AVATAR_KEY) ??
        localStorage.getItem("academic.myAvatar.v1");
      if (rawAvatar) setAvatarState(JSON.parse(rawAvatar));
    } catch {}

    try {
      const rawProfile = localStorage.getItem(PROFILE_KEY);
      if (rawProfile) {
        setProfileState((prev) => ({ ...prev, ...JSON.parse(rawProfile) }));
      }
    } catch {}
  }, []);

  const setMyAvatar = React.useCallback((v: AvatarOverrides) => {
    setAvatarState(v);
    try {
      localStorage.setItem(AVATAR_KEY, JSON.stringify(v));
    } catch {}
  }, []);

  const setMyProfile = React.useCallback((v: Partial<CustomProfileData>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...v };
      try {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const resetMyProfile = React.useCallback(() => {
    setProfileState(DEFAULT_MY_PROFILE);
    try {
      localStorage.removeItem(PROFILE_KEY);
    } catch {}
  }, []);

  return (
    <Ctx.Provider
      value={{
        myAvatar,
        setMyAvatar,
        myProfile,
        setMyProfile,
        resetMyProfile,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export const useProfileStore = () => React.useContext(Ctx);
