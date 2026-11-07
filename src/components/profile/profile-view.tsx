"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { AsciiReveal } from "ascii-reveal";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  CalendarBlank,
  EnvelopeSimple,
  Phone,
  Buildings,
  PencilSimple,
  Shuffle,
  X,
  Check,
  ArrowCounterClockwise,
  Clock,
  Plus,
  Sparkle,
  Signature,
  UploadSimple,
  Trash,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { NexusAvatar } from "@/components/ui/nexus-avatar";
import { ProfileBanner } from "@/components/ui/profile-banner";
import { getProfile } from "@/lib/mock/profiles";
import {
  ME_EMAIL,
  AVATAR_OPTIONS,
  AVATAR_OPTION_LABELS,
  AVATAR_COLORS,
  AVAILABILITY_STATUS_OPTIONS,
  useProfileStore,
  type AvatarOverrides,
  type CustomProfileData,
} from "@/lib/profile-store";

const EDITOR_STEPS = [
  {
    id: "hair",
    label: "Cabello",
    optionKey: "hair" as const,
    colorKey: "hairColor" as const,
    colorLabel: "Color de cabello",
  },
  {
    id: "eyes",
    label: "Ojos",
    optionKey: "eyes" as const,
    colorKey: "eyesColor" as const,
    colorLabel: "Color de mirada y lentes",
  },
  {
    id: "mouth",
    label: "Boca",
    optionKey: "mouth" as const,
    colorKey: "mouthColor" as const,
    colorLabel: "Color de barba y gesto",
  },
  {
    id: "body",
    label: "Ropa",
    optionKey: "body" as const,
    colorKey: "bodyColor" as const,
    colorLabel: "Color de prenda",
  },
  {
    id: "skin",
    label: "Rasgos",
    optionKey: "faceDetails" as const,
    colorKey: "headColor" as const,
    colorLabel: "Tono de piel",
  },
  {
    id: "extras",
    label: "Extras",
    optionKey: "accessory" as const,
    colorKey: "backgroundColor" as const,
    colorLabel: "Fondo",
  },
] as const;

type StepId = (typeof EDITOR_STEPS)[number]["id"];

/** Resize uploaded banner image on client canvas so localStorage stays fast and light */
function compressBannerImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("No se pudo leer la imagen"));
    reader.onload = () => {
      const img = new window.Image();
      img.onerror = () => reject(new Error("Imagen inválida"));
      img.onload = () => {
        const maxW = 1400;
        const maxH = 520;
        let { width, height } = img;
        if (width > maxW) {
          height = Math.round((height * maxW) / width);
          width = maxW;
        }
        if (height > maxH) {
          width = Math.round((width * maxH) / height);
          height = maxH;
        }
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.86));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function ProfileView({
  email,
  fallbackName,
  onBack,
  onMessage,
}: {
  email: string;
  fallbackName?: string;
  onBack: () => void;
  onMessage?: () => void;
  onPushToast?: (t: string, d?: string) => void;
}) {
  const baseProfile = getProfile(email, fallbackName);
  const isMe = email === ME_EMAIL;
  const { myProfile, setMyProfile, resetMyProfile } = useProfileStore();

  const [editingAvatar, setEditingAvatar] = React.useState(false);
  const [editingProfile, setEditingProfile] = React.useState(false);
  const [newTagText, setNewTagText] = React.useState("");
  const snapshotRef = React.useRef<CustomProfileData>(myProfile);
  const bannerInputRef = React.useRef<HTMLInputElement>(null);

  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);

  // Modern ASCII decode on entry
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingProfile(false);
    }, 450);
    return () => clearTimeout(timer);
  }, [email]);

  const display = React.useMemo(() => {
    if (!isMe) {
      return {
        name: baseProfile.name,
        role: baseProfile.role,
        department: baseProfile.department,
        bio: baseProfile.bio,
        location: baseProfile.location,
        joined: baseProfile.joined,
        phone: baseProfile.phone ?? "",
        officeHours:
          baseProfile.officeHours ?? "Lun – Vie • 8:00 a.m. a 4:00 p.m.",
        statusType: baseProfile.statusType ?? ("available" as const),
        statusText: baseProfile.statusText ?? "Disponible",
        tags: baseProfile.tags,
        stats: baseProfile.stats,
      };
    }
    return {
      name: myProfile.name,
      role: myProfile.role,
      department: myProfile.department,
      bio: myProfile.bio,
      location: myProfile.location,
      joined: baseProfile.joined,
      phone: myProfile.phone,
      officeHours: myProfile.officeHours,
      statusType: myProfile.statusType,
      statusText: myProfile.statusText,
      tags: myProfile.tags,
      stats: baseProfile.stats,
    };
  }, [isMe, baseProfile, myProfile]);

  const statusMeta =
    AVAILABILITY_STATUS_OPTIONS.find((s) => s.id === display.statusType) ??
    AVAILABILITY_STATUS_OPTIONS[0];

  const handleStartEditing = () => {
    snapshotRef.current = { ...myProfile, tags: [...myProfile.tags] };
    setEditingProfile(true);
  };

  const handleCancelEditing = () => {
    setMyProfile(snapshotRef.current);
    setNewTagText("");
    setEditingProfile(false);
  };

  const handleSaveEditing = () => {
    setNewTagText("");
    setEditingProfile(false);
  };

  const handleBannerFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const dataUrl = await compressBannerImage(file);
      setMyProfile({ bannerImage: dataUrl });
    } catch {
      // Quiet error handling
    } finally {
      e.target.value = "";
    }
  };

  const handleAddTag = (e?: React.FormEvent) => {
    e?.preventDefault();
    const clean = newTagText.trim();
    if (!clean) return;
    if (!myProfile.tags.includes(clean)) {
      setMyProfile({ tags: [...myProfile.tags, clean] });
    }
    setNewTagText("");
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setMyProfile({
      tags: myProfile.tags.filter((t) => t !== tagToRemove),
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.16, ease: "easeOut" }}
        className="max-w-[1120px] mx-auto w-full space-y-4"
      >
        {/* Top Navigation Row */}
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={onBack}
            className="text-[12.5px] font-medium text-[#78756E] hover:text-[#18181B] inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-[#F3F2EE] transition-colors press-scale"
          >
            <ArrowLeft weight="bold" className="w-3.5 h-3.5" />
            Volver
          </button>

          {isMe && editingProfile && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  resetMyProfile();
                }}
                className="h-8 px-3 rounded-xl text-[12px] font-medium text-[#78756E] hover:text-[#18181B] hover:bg-[#F3F2EE] transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowCounterClockwise weight="bold" className="w-3.5 h-3.5" />
                Restablecer
              </button>
              <button
                type="button"
                onClick={handleCancelEditing}
                className="h-8 px-3.5 rounded-xl border border-[#E5E4DF] bg-white text-[12.5px] font-medium text-[#52504A] hover:text-[#18181B] hover:bg-[#FAF9F6] transition-colors press-scale"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveEditing}
                className="h-8 px-4 rounded-xl bg-[#18181B] text-white text-[12.5px] font-semibold hover:bg-black transition-colors press-scale inline-flex items-center gap-1.5 shadow-2xs"
              >
                <Check weight="bold" className="w-3.5 h-3.5" />
                Guardar perfil
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_330px] gap-4 items-start">
          {/* MAIN PROFILE CARD with individual AsciiReveal */}
          <AsciiReveal
            preset="decode"
            duration="fast"
            speed={1.4}
            loading={isLoadingProfile}
            shimmer={true}
            className="w-full"
          >
            <div className="bg-white border border-[#ECECE9] rounded-2xl overflow-hidden shadow-xs">
            {/* Flush Cover Banner */}
            <div className="relative">
              <ProfileBanner
                seed={email}
                className="h-40 sm:h-48 w-full rounded-t-2xl"
              />

              {/* Image Upload Controls on Mi Perfil */}
              {isMe && (
                <>
                  <input
                    ref={bannerInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleBannerFileChange}
                    className="hidden"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    {myProfile.bannerImage && (
                      <button
                        type="button"
                        onClick={() =>
                          setMyProfile({ bannerImage: undefined })
                        }
                        title="Restaurar portada original"
                        aria-label="Restaurar portada original"
                        className="h-8 w-8 rounded-xl bg-white/85 hover:bg-white backdrop-blur-md border border-black/[0.08] text-[#52504A] hover:text-[#18181B] flex items-center justify-center shadow-2xs transition-colors press-scale"
                      >
                        <Trash weight="regular" className="w-3.5 h-3.5" />
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => bannerInputRef.current?.click()}
                      className="h-8 px-3 rounded-xl bg-white/85 hover:bg-white backdrop-blur-md border border-black/[0.08] text-[12px] font-medium text-[#18181B] inline-flex items-center gap-1.5 shadow-2xs transition-colors press-scale"
                    >
                      <UploadSimple weight="bold" className="w-3.5 h-3.5" />
                      <span>Subir portada</span>
                    </button>
                  </div>
                </>
              )}
            </div>

            {/* Top Identity Block */}
            <div className="px-5 sm:px-7 pt-3 pb-6">
              {/* Avatar + Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
                <div className="relative z-10 -mt-12 sm:-mt-14 rounded-full ring-4 ring-white bg-white shadow-xs self-start shrink-0">
                  <NexusAvatar seed={email} size={104} border={false} />
                  {isMe && (
                    <button
                      type="button"
                      onClick={() => setEditingAvatar(true)}
                      title="Modificar avatar"
                      aria-label="Modificar avatar"
                      className="absolute bottom-0.5 right-0.5 w-8 h-8 rounded-full bg-[#18181B] text-white ring-2 ring-white flex items-center justify-center hover:bg-black press-scale shadow-xs transition-colors"
                    >
                      <Sparkle weight="fill" className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Right Action Buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {isMe ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setEditingAvatar(true)}
                        className="h-9 px-3.5 rounded-xl border border-[#E5E4DF] bg-[#FAF9F6] hover:bg-[#F3F2EE] text-[12.5px] font-medium text-[#18181B] press-scale inline-flex items-center gap-1.5 transition-colors"
                      >
                        <Sparkle
                          weight="regular"
                          className="w-3.5 h-3.5 text-[#52504A]"
                        />
                        Diseñar avatar
                      </button>

                      {!editingProfile ? (
                        <button
                          type="button"
                          onClick={handleStartEditing}
                          className="h-9 px-4 rounded-xl border border-[#DFDDD6] bg-white hover:bg-[#FAF9F6] text-[12.5px] font-semibold text-[#18181B] press-scale inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                        >
                          <PencilSimple weight="bold" className="w-3.5 h-3.5" />
                          Editar perfil
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSaveEditing}
                          className="h-9 px-4 rounded-xl bg-[#18181B] text-white text-[12.5px] font-semibold hover:bg-black press-scale inline-flex items-center gap-1.5 shadow-2xs transition-colors"
                        >
                          <Check weight="bold" className="w-3.5 h-3.5" />
                          Listo
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={onMessage}
                      className="h-9 px-4 rounded-xl bg-[#18181B] text-white text-[12.5px] font-semibold hover:bg-black press-scale inline-flex items-center gap-1.5 shadow-2xs"
                    >
                      <EnvelopeSimple weight="bold" className="w-3.5 h-3.5" />
                      Enviar mensaje
                    </button>
                  )}
                </div>
              </div>

              {/* AnimatePresence for smooth modern curtain transition */}
              <AnimatePresence mode="wait" initial={false}>
                {isMe && editingProfile ? (
                  <motion.div
                    key="edit-mode-panel"
                    initial={{ opacity: 0, height: 0, scaleY: 0.98 }}
                    animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                    exit={{ opacity: 0, height: 0, scaleY: 0.98 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1], // Emil Kowalski responsive curtain curve
                    }}
                    className="origin-top overflow-hidden"
                  >
                    <div className="pt-4 space-y-4 max-w-[620px]">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#78756E] mb-1">
                            Nombre completo
                          </label>
                          <input
                            type="text"
                            value={myProfile.name}
                            onChange={(e) =>
                              setMyProfile({ name: e.target.value })
                            }
                            className="w-full h-9 px-3 rounded-xl border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[14px] font-semibold text-[#18181B] outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#78756E] mb-1">
                            Cargo institucional
                          </label>
                          <input
                            type="text"
                            value={myProfile.role}
                            onChange={(e) =>
                              setMyProfile({ role: e.target.value })
                            }
                            className="w-full h-9 px-3 rounded-xl border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[13.5px] font-medium text-[#18181B] outline-none transition-colors"
                          />
                        </div>
                      </div>

                      {/* Availability Status Selector: sleek modern segmented pills */}
                      <div className="p-3 rounded-xl bg-[#FAF9F6] border border-[#ECECE9] space-y-2">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78756E]">
                            Estado
                          </span>
                          <div className="relative inline-flex items-center gap-1 p-0.5 rounded-xl bg-[#F0EFEB] border border-[#E5E4DF]">
                            {AVAILABILITY_STATUS_OPTIONS.map((opt) => {
                              const active = myProfile.statusType === opt.id;
                              return (
                                <button
                                  key={opt.id}
                                  type="button"
                                  onClick={() =>
                                    setMyProfile({
                                      statusType: opt.id,
                                      statusText: opt.defaultText,
                                    })
                                  }
                                  className={cn(
                                    "relative px-2.5 py-1 rounded-lg text-[12px] font-medium transition-colors select-none press-scale z-10",
                                    active
                                      ? "text-[#18181B] font-semibold"
                                      : "text-[#78756E] hover:text-[#18181B]"
                                  )}
                                >
                                  {active && (
                                    <motion.span
                                      layoutId="status-active-pill"
                                      transition={{
                                        type: "spring",
                                        stiffness: 520,
                                        damping: 38,
                                        mass: 0.6,
                                      }}
                                      className="absolute inset-0 rounded-lg bg-white shadow-2xs border border-[#DFDDD6] -z-10"
                                    />
                                  )}
                                  <span className="relative z-10">{opt.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={myProfile.statusText}
                          onChange={(e) =>
                            setMyProfile({ statusText: e.target.value })
                          }
                          placeholder="Nota de estado (ej. Disponible para consultas)..."
                          className="w-full h-8 px-2.5 rounded-lg border border-[#E5E4DF] bg-white text-[12.5px] text-[#18181B] outline-none focus:border-[#18181B] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#78756E] mb-1">
                          Resumen profesional
                        </label>
                        <textarea
                          rows={2}
                          value={myProfile.bio}
                          onChange={(e) => setMyProfile({ bio: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[13.5px] leading-relaxed text-[#18181B] outline-none resize-none transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="read-mode-panel"
                    initial={{ opacity: 0, height: 0, scaleY: 0.98 }}
                    animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                    exit={{ opacity: 0, height: 0, scaleY: 0.98 }}
                    transition={{
                      duration: 0.22,
                      ease: [0.16, 1, 0.3, 1], // Emil Kowalski responsive curtain curve
                    }}
                    className="origin-top overflow-hidden"
                  >
                    <div className="pt-4 space-y-3.5">
                      <div>
                        <div className="flex flex-wrap items-baseline gap-2.5">
                          <h1 className="text-[22px] font-bold tracking-tight text-[#18181B] leading-tight">
                            {display.name}
                          </h1>
                          <span className="text-[11.5px] font-semibold uppercase tracking-wide text-[#52504A] bg-[#F4F3F0] px-2 py-0.5 rounded-md">
                            {statusMeta.label}
                          </span>
                        </div>

                        <div className="text-[13.5px] font-medium text-[#52504A] mt-1 flex flex-wrap items-center gap-1.5">
                          <span>{display.role}</span>
                          <span className="text-[#C2BFB6]">•</span>
                          <span className="text-[#78756E]">
                            {display.department}
                          </span>
                          {display.statusText &&
                            display.statusText !== statusMeta.label && (
                              <>
                                <span className="text-[#C2BFB6]">•</span>
                                <span className="text-[#78756E] italic">
                                  {display.statusText}
                                </span>
                              </>
                            )}
                        </div>
                      </div>

                      <p className="text-[14px] leading-relaxed text-[#334155] max-w-[65ch]">
                        {display.bio}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Context Metadata Row (Location & Tenure) */}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5 text-[12.5px] text-[#78756E]">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#9A978F]" />
                  {display.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarBlank className="w-3.5 h-3.5 text-[#9A978F]" />
                  {display.joined}
                </span>
              </div>

              {/* Email Signature Block (Minimalist, only on own profile) */}
              {isMe && (
                <div className="mt-4 pt-4 border-t border-[#F4F3F0]">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#18181B]">
                      <Signature className="w-4 h-4 text-[#78756E]" />
                      <span>Firma para comunicaciones</span>
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setMyProfile({ useSignature: !myProfile.useSignature })
                      }
                      className={cn(
                        "h-6 px-2.5 rounded-lg text-[11px] font-medium border transition-colors press-scale",
                        myProfile.useSignature
                          ? "bg-[#ECFDF5] border-[#A7F3D0] text-[#059669]"
                          : "bg-[#FAF9F6] border-[#E5E4DF] text-[#78756E]"
                      )}
                    >
                      {myProfile.useSignature ? "Activa al redactar" : "Inactiva"}
                    </button>
                  </div>

                  {editingProfile ? (
                    <textarea
                      rows={2}
                      value={myProfile.signature}
                      onChange={(e) =>
                        setMyProfile({ signature: e.target.value })
                      }
                      placeholder="Escribe tu firma institucional para correos..."
                      className="w-full px-3 py-2 rounded-xl border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[12.5px] text-[#18181B] outline-none resize-none leading-relaxed"
                    />
                  ) : (
                    <div className="px-3.5 py-2.5 rounded-xl bg-[#FAF9F6] border border-[#ECECE9] text-[12.5px] text-[#52504A] whitespace-pre-line leading-relaxed">
                      {myProfile.signature}
                    </div>
                  )}
                </div>
              )}
            </div>
            </div>
          </AsciiReveal>

          {/* RIGHT SIDEBAR with individual AsciiReveal */}
          <AsciiReveal
            preset="decode"
            duration="fast"
            speed={1.4}
            loading={isLoadingProfile}
            shimmer={true}
            className="w-full"
          >
            <div className="bg-white border border-[#ECECE9] rounded-2xl p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[12.5px] font-semibold text-[#18181B]">
                Ficha institucional
              </span>
              {isMe && !editingProfile && (
                <button
                  type="button"
                  onClick={handleStartEditing}
                  className="text-[11.5px] font-medium text-[#78756E] hover:text-[#18181B] transition-colors"
                >
                  Editar
                </button>
              )}
            </div>

            {/* Institutional side info with smooth height transition */}
            <AnimatePresence mode="wait" initial={false}>
              {isMe && editingProfile ? (
                <motion.div
                  key="side-info-editing"
                  initial={{ opacity: 0, height: 0, scaleY: 0.98 }}
                  animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                  exit={{ opacity: 0, height: 0, scaleY: 0.98 }}
                  transition={{
                    duration: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="origin-top overflow-hidden"
                >
                  <div className="space-y-3 text-[13px] pt-1">
                    <div>
                      <label className="block text-[11px] text-[#78756E] mb-1">
                        Departamento
                      </label>
                      <input
                        type="text"
                        value={myProfile.department}
                        onChange={(e) =>
                          setMyProfile({ department: e.target.value })
                        }
                        className="w-full h-8 px-2.5 rounded-lg border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[12.5px] font-medium text-[#18181B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#78756E] mb-1">
                        Ubicación / Despacho
                      </label>
                      <input
                        type="text"
                        value={myProfile.location}
                        onChange={(e) => setMyProfile({ location: e.target.value })}
                        className="w-full h-8 px-2.5 rounded-lg border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[12.5px] font-medium text-[#18181B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#78756E] mb-1">
                        Horario de atención
                      </label>
                      <input
                        type="text"
                        value={myProfile.officeHours}
                        onChange={(e) =>
                          setMyProfile({ officeHours: e.target.value })
                        }
                        className="w-full h-8 px-2.5 rounded-lg border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[12.5px] font-medium text-[#18181B] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#78756E] mb-1">
                        Teléfono / Extensión
                      </label>
                      <input
                        type="text"
                        value={myProfile.phone}
                        onChange={(e) => setMyProfile({ phone: e.target.value })}
                        className="w-full h-8 px-2.5 rounded-lg border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white focus:border-[#18181B] text-[12.5px] font-medium text-[#18181B] outline-none tabular-nums"
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="side-info-reading"
                  initial={{ opacity: 0, height: 0, scaleY: 0.98 }}
                  animate={{ opacity: 1, height: "auto", scaleY: 1 }}
                  exit={{ opacity: 0, height: 0, scaleY: 0.98 }}
                  transition={{
                    duration: 0.22,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="origin-top overflow-hidden"
                >
                  <dl className="space-y-3 text-[13px] pt-1">
                    <div>
                      <dt className="text-[11.5px] text-[#78756E]">Departamento</dt>
                      <dd className="text-[#18181B] font-medium inline-flex items-center gap-1.5 mt-0.5">
                        <Buildings className="w-3.5 h-3.5 text-[#78756E]" />
                        {display.department}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[11.5px] text-[#78756E]">
                        Horario de atención
                      </dt>
                      <dd className="text-[#18181B] font-medium inline-flex items-center gap-1.5 mt-0.5">
                        <Clock className="w-3.5 h-3.5 text-[#78756E]" />
                        {display.officeHours}
                      </dd>
                    </div>

                    <div>
                      <dt className="text-[11.5px] text-[#78756E]">Correo</dt>
                      <dd className="text-[#18181B] font-medium inline-flex items-center gap-1.5 mt-0.5 break-all">
                        <EnvelopeSimple className="w-3.5 h-3.5 text-[#78756E] shrink-0" />
                        {email}
                      </dd>
                    </div>

                    {display.phone && (
                      <div>
                        <dt className="text-[11.5px] text-[#78756E]">Teléfono</dt>
                        <dd className="text-[#18181B] font-medium inline-flex items-center gap-1.5 tabular-nums mt-0.5">
                          <Phone className="w-3.5 h-3.5 text-[#78756E]" />
                          {display.phone}
                        </dd>
                      </div>
                    )}
                  </dl>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Areas / Tags with inline add & remove */}
            <div className="pt-3 border-t border-[#F4F3F0] space-y-2">
              <div className="text-[11.5px] text-[#78756E]">
                Áreas y comisiones
              </div>
              <div className="flex flex-wrap gap-1.5">
                {display.tags.map((t) => (
                  <span
                    key={t}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F4F3F0] text-[11.5px] font-medium text-[#52504A]"
                  >
                    <span>{t}</span>
                    {isMe && editingProfile && (
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(t)}
                        aria-label={`Quitar etiqueta ${t}`}
                        className="text-[#78756E] hover:text-[#18181B] ml-0.5"
                      >
                        <X weight="bold" className="w-2.5 h-2.5" />
                      </button>
                    )}
                  </span>
                ))}
              </div>

              {isMe && editingProfile && (
                <form
                  onSubmit={handleAddTag}
                  className="flex items-center gap-1.5 pt-1"
                >
                  <input
                    type="text"
                    value={newTagText}
                    onChange={(e) => setNewTagText(e.target.value)}
                    placeholder="Añadir comisión o área..."
                    className="flex-1 h-7 px-2.5 rounded-lg border border-[#DFDDD6] bg-[#FAF9F6] focus:bg-white text-[12px] text-[#18181B] outline-none"
                  />
                  <button
                    type="submit"
                    className="h-7 px-2.5 rounded-lg bg-[#18181B] text-white text-[11.5px] font-medium hover:bg-black inline-flex items-center gap-1"
                  >
                    <Plus weight="bold" className="w-3 h-3" />
                    Añadir
                  </button>
                </form>
              )}
            </div>
          </div>
          </AsciiReveal>
        </div>
      </motion.div>

      <AvatarEditorPortal
        open={editingAvatar}
        onClose={() => setEditingAvatar(false)}
        onSaved={() => {
          setEditingAvatar(false);
        }}
      />
    </>
  );
}

function pick<T>(arr: readonly T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Compact, rock-solid Avatar Studio modal:
 * - Zero page scrollbar shift (does not mutate document.body.style.overflow)
 * - Zero vertical jump or scale bounce on open or option change
 * - Fixed compact dimensions (max-w-[520px]) with instant category switching
 */
function AvatarEditorPortal({
  open,
  onClose,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [mounted, setMounted] = React.useState(false);
  const { myAvatar, setMyAvatar } = useProfileStore();
  const initialAvatarRef = React.useRef<AvatarOverrides>(myAvatar);
  const [activeStepId, setActiveStepId] = React.useState<StepId>("hair");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      initialAvatarRef.current = { ...myAvatar };
      setActiveStepId("hair");
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMyAvatar(initialAvatarRef.current);
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, setMyAvatar]);

  if (!mounted || !open) return null;

  const stepIndex = EDITOR_STEPS.findIndex((s) => s.id === activeStepId);
  const currentStep = EDITOR_STEPS[stepIndex] ?? EDITOR_STEPS[0];

  const updateField = <K extends keyof AvatarOverrides>(
    key: K,
    value: AvatarOverrides[K]
  ) => {
    setMyAvatar({ ...myAvatar, [key]: value });
  };

  const randomize = () => {
    setMyAvatar({
      hair: pick(AVATAR_OPTIONS.hair),
      eyes: pick(AVATAR_OPTIONS.eyes),
      mouth: pick(AVATAR_OPTIONS.mouth),
      body: pick(AVATAR_OPTIONS.body),
      faceDetails: pick(AVATAR_OPTIONS.faceDetails),
      accessory: pick(AVATAR_OPTIONS.accessory),
      hairColor: pick(AVATAR_COLORS.hairColor),
      eyesColor: pick(AVATAR_COLORS.eyesColor),
      mouthColor: pick(AVATAR_COLORS.mouthColor),
      headColor: pick(AVATAR_COLORS.headColor),
      bodyColor: pick(AVATAR_COLORS.bodyColor),
      accessoryColor: pick(AVATAR_COLORS.accessoryColor),
      backgroundColor: pick(AVATAR_COLORS.backgroundColor),
    });
  };

  const handleCancel = () => {
    setMyAvatar(initialAvatarRef.current);
    onClose();
  };

  const handleReset = () => {
    setMyAvatar({});
  };

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          key="avatar-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          style={{ margin: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-black/35 backdrop-blur-[2px]"
          onClick={handleCancel}
        >
          <motion.div
            key="avatar-modal-card"
            role="dialog"
            aria-modal="true"
            aria-label="Diseña tu avatar"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{
              type: "spring",
              stiffness: 480,
              damping: 34,
              mass: 0.7,
            }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[500px] max-h-[calc(100dvh-1.5rem)] bg-white rounded-2xl border border-[#E5E4DF] shadow-floating flex flex-col overflow-hidden"
          >
            {/* Clean Studio Header: Avatar libre sin contenedor, minimalista */}
            <div className="px-4 sm:px-5 py-3.5 sm:py-4 bg-white border-b border-[#F1F0EC] flex items-center justify-between gap-2 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <NexusAvatar
                  seed="mariana-solis-directora"
                  size={48}
                  config={myAvatar}
                  border={false}
                  className="shrink-0"
                />

                <div className="min-w-0">
                  <div className="text-[13.5px] sm:text-[14px] font-semibold text-[#18181B] leading-tight truncate">
                    Diseña tu avatar
                  </div>
                  <div className="text-[11px] sm:text-[11.5px] text-[#78756E] mt-0.5 truncate">
                    {currentStep.label} • Paso {stepIndex + 1}/{EDITOR_STEPS.length}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={randomize}
                  className="h-7 px-2 sm:px-2.5 rounded-lg border border-[#E5E4DF] bg-[#FAF9F6] hover:bg-[#F3F2EE] text-[11.5px] font-medium text-[#18181B] inline-flex items-center gap-1 transition-colors press-scale"
                >
                  <Shuffle weight="bold" className="w-3 h-3" />
                  <span className="hidden sm:inline">Aleatorio</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="h-7 px-2 rounded-lg border border-[#ECECE9] bg-white text-[11.5px] font-medium text-[#78756E] hover:text-[#18181B] hover:bg-[#F4F3F0] inline-flex items-center gap-1 transition-colors press-scale"
                  title="Restablecer base"
                >
                  <ArrowCounterClockwise weight="bold" className="w-3 h-3" />
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  aria-label="Cerrar editor de avatar"
                  className="w-7 h-7 rounded-lg hover:bg-[#F4F3F0] flex items-center justify-center text-[#78756E] hover:text-[#18181B] transition-colors ml-0.5"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Compact Segmented Step Pills */}
            <div className="px-4 sm:px-5 py-2 bg-[#FAF9F6] border-b border-[#F1F0EC] flex items-center gap-1 overflow-x-auto no-scrollbar">
              {EDITOR_STEPS.map((step) => {
                const isSelected = step.id === activeStepId;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStepId(step.id)}
                    className={cn(
                      "relative px-3 py-1 rounded-lg text-[12px] font-medium transition-colors select-none shrink-0",
                      isSelected
                        ? "text-[#18181B] font-semibold"
                        : "text-[#78756E] hover:text-[#18181B]"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="avatar-compact-tab"
                        transition={{
                          type: "spring",
                          stiffness: 580,
                          damping: 38,
                        }}
                        className="absolute inset-0 rounded-lg bg-white border border-[#DFDDD6] shadow-2xs"
                      />
                    )}
                    <span className="relative z-10">{step.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Fixed-Height Content Area (Clean options, libre de marcos pesados) */}
            <div className="p-4 max-h-[300px] h-[260px] sm:h-[280px] overflow-y-auto no-scrollbar space-y-4">
              {/* Option Grid */}
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {AVATAR_OPTIONS[currentStep.optionKey].map((opt) => {
                  const currentVal =
                    myAvatar[currentStep.optionKey] ??
                    (currentStep.optionKey === "faceDetails" ||
                    currentStep.optionKey === "accessory"
                      ? "none"
                      : undefined);
                  const isSelected = currentVal === opt;
                  const label =
                    AVATAR_OPTION_LABELS[currentStep.optionKey]?.[opt] ?? opt;

                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() =>
                        updateField(currentStep.optionKey, opt as never)
                      }
                      aria-pressed={isSelected}
                      className={cn(
                        "relative flex flex-col items-center gap-1.5 p-2 rounded-xl border text-center transition-colors press-scale",
                        isSelected
                          ? "bg-[#F4F3F0] border-[#18181B]/40 shadow-2xs"
                          : "bg-white border-[#ECECE9] hover:border-[#DCDAD3] hover:bg-[#FAF9F6]"
                      )}
                    >
                      {isSelected && (
                        <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 rounded bg-[#18181B] text-white flex items-center justify-center">
                          <Check weight="bold" className="w-2 h-2" />
                        </span>
                      )}

                      <NexusAvatar
                        seed="mariana-solis-directora"
                        size={46}
                        border={false}
                        config={{
                          ...myAvatar,
                          [currentStep.optionKey]: opt,
                        }}
                      />

                      <span
                        className={cn(
                          "text-[11px] leading-tight truncate max-w-full",
                          isSelected
                            ? "font-semibold text-[#18181B]"
                            : "font-medium text-[#52504A]"
                        )}
                      >
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Color Palette Row */}
              <div className="pt-2 border-t border-[#F4F3F0] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#78756E]">
                    {currentStep.colorLabel}
                  </span>
                  <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#52504A] hover:text-[#18181B] cursor-pointer bg-[#F4F3F0] px-2 py-0.5 rounded-md">
                    <span>Libre</span>
                    <input
                      type="color"
                      value={
                        (myAvatar[currentStep.colorKey] as string) ??
                        AVATAR_COLORS[currentStep.colorKey][0]
                      }
                      onChange={(e) =>
                        updateField(currentStep.colorKey, e.target.value)
                      }
                      className="w-3.5 h-3.5 rounded border-0 p-0 bg-transparent cursor-pointer"
                    />
                  </label>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {AVATAR_COLORS[currentStep.colorKey].map((hex) => {
                    const isSelected =
                      myAvatar[currentStep.colorKey]?.toLowerCase() ===
                      hex.toLowerCase();
                    return (
                      <button
                        key={hex}
                        type="button"
                        onClick={() => updateField(currentStep.colorKey, hex)}
                        aria-label={`Color ${hex}`}
                        className={cn(
                          "w-7 h-7 rounded-lg flex items-center justify-center border transition-transform",
                          isSelected
                            ? "border-[#18181B] scale-105"
                            : "border-black/10 hover:scale-105"
                        )}
                        style={{ backgroundColor: hex }}
                      >
                        {isSelected && (
                          <span className="w-3.5 h-3.5 rounded bg-white/90 text-[#18181B] flex items-center justify-center">
                            <Check weight="bold" className="w-2 h-2" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {currentStep.id === "extras" && (
                <div className="pt-2 border-t border-[#F4F3F0] space-y-1.5">
                  <span className="block text-[11px] font-semibold uppercase tracking-wider text-[#78756E]">
                    Acabado de accesorio
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {AVATAR_COLORS.accessoryColor.map((hex) => {
                      const isSelected =
                        (myAvatar.accessoryColor ?? "#D97706").toLowerCase() ===
                        hex.toLowerCase();
                      return (
                        <button
                          key={hex}
                          type="button"
                          onClick={() => updateField("accessoryColor", hex)}
                          aria-label={`Acabado ${hex}`}
                          className={cn(
                            "w-7 h-7 rounded-lg flex items-center justify-center border",
                            isSelected
                              ? "border-[#18181B] scale-105"
                              : "border-black/10"
                          )}
                          style={{ backgroundColor: hex }}
                        >
                          {isSelected && (
                            <span className="w-3.5 h-3.5 rounded bg-white/90 text-[#18181B] flex items-center justify-center">
                              <Check weight="bold" className="w-2 h-2" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Compact Modal Footer */}
            <div className="px-3 sm:px-5 h-12 border-t border-[#F1F0EC] bg-[#FAF9F6] flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                <button
                  type="button"
                  disabled={stepIndex === 0}
                  onClick={() =>
                    setActiveStepId(EDITOR_STEPS[Math.max(0, stepIndex - 1)].id)
                  }
                  className="h-7 px-2 sm:px-2.5 rounded-lg border border-[#E5E4DF] bg-white text-[12px] font-medium text-[#52504A] hover:text-[#18181B] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft weight="bold" className="w-3 h-3" />
                  <span className="hidden sm:inline">Anterior</span>
                </button>
                <button
                  type="button"
                  disabled={stepIndex === EDITOR_STEPS.length - 1}
                  onClick={() =>
                    setActiveStepId(
                      EDITOR_STEPS[
                        Math.min(EDITOR_STEPS.length - 1, stepIndex + 1)
                      ].id
                    )
                  }
                  className="h-7 px-2 sm:px-2.5 rounded-lg border border-[#E5E4DF] bg-white text-[12px] font-medium text-[#52504A] hover:text-[#18181B] disabled:opacity-40 disabled:pointer-events-none inline-flex items-center gap-1 transition-colors"
                >
                  <span className="hidden sm:inline">Siguiente</span>
                  <ArrowRight weight="bold" className="w-3 h-3" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="h-8 px-2 sm:px-3 rounded-lg text-[12px] sm:text-[12.5px] font-medium text-[#52504A] hover:bg-[#ECEBE6] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={onSaved}
                  className="h-8 px-3.5 sm:px-4 rounded-xl bg-[#18181B] text-white text-[12px] sm:text-[12.5px] font-semibold hover:bg-black transition-colors shadow-2xs inline-flex items-center gap-1.5 shrink-0"
                >
                  <Check weight="bold" className="w-3.5 h-3.5" />
                  <span>Guardar</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
