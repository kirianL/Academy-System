"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { SlotText } from "slot-text/react";
import { AnimatePresence, motion } from "motion/react";
import {
  Tray,
  PaperPlaneTilt,
  NoteBlank,
  PencilSimpleLine,
  Archive,
  Trash,
  EnvelopeSimple,
  EnvelopeOpen,
  DownloadSimple,
  List,
  X,
  Paperclip,
  ArrowsOutSimple,
  Minus,
  PaperPlaneRight,
  Sparkle,
  ArrowCounterClockwise,
  ArrowUpRight,
  Signature,
} from "@phosphor-icons/react";
import {
  CommunicationMessage,
  INITIAL_COMMUNICATIONS,
  ThreadReplyItem,
} from "@/lib/mock/nexus-demo-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NexusAvatar } from "@/components/ui/nexus-avatar";
import { ProfileBanner } from "@/components/ui/profile-banner";
import { getProfile } from "@/lib/mock/profiles";
import {
  ME_EMAIL,
  useProfileStore,
} from "@/lib/profile-store";
import { MagnifyingGlass } from "@phosphor-icons/react";
import {
  BrandFileBadge,
  AdobePdfIcon,
  MicrosoftExcelIcon,
} from "@/components/ui/brand-file-icons";

export interface CommunicationsInboxProps {
  onPushToast?: (title: string, description?: string) => void;
  onOpenProfile?: (email: string, name?: string) => void;
}

export function CommunicationsInbox({ onOpenProfile }: CommunicationsInboxProps) {
  const { myProfile } = useProfileStore();
  const [messages, setMessages] = React.useState<CommunicationMessage[]>(
    INITIAL_COMMUNICATIONS
  );
  const [currentCategory, setCurrentCategory] = React.useState<
    "inbox" | "sent" | "drafts"
  >("inbox");
  const [selectedMessageId, setSelectedMessageId] = React.useState<string | null>(
    null
  );
  const [composeOpen, setComposeOpen] = React.useState(false);
  const [composeMinimized, setComposeMinimized] = React.useState(false);
  const [quickReplyText, setQuickReplyText] = React.useState("");
  const [isReplying, setIsReplying] = React.useState(false);
  const [replyAttachment, setReplyAttachment] = React.useState<{
    name: string;
    size: string;
    type: "pdf" | "pptx" | "xlsx" | "docx" | "image" | "file" | string;
    url?: string;
  } | null>(null);
  const [isAiRefiningReply, setIsAiRefiningReply] = React.useState(false);
  const replyFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const threadBottomRef = React.useRef<HTMLDivElement>(null);
  const [searchFilter, setSearchFilter] = React.useState("");

  // Compose form state
  const [composeTo, setComposeTo] = React.useState("Rico Oktananda (rico.oktananda1@gmail.com)");
  const [composeSubject, setComposeSubject] = React.useState("");
  const [composeBody, setComposeBody] = React.useState("");
  const [composeSending, setComposeSending] = React.useState(false);
  const [isAiRefining, setIsAiRefining] = React.useState(false);
  const [previousBody, setPreviousBody] = React.useState<string | null>(null);
  const [composeAttachment, setComposeAttachment] = React.useState<{
    name: string;
    size: string;
    type: "pdf" | "pptx" | "xlsx" | "docx" | "image" | "file" | string;
    url?: string;
  } | null>(null);
  const composeFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleComposeFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    let fileType: "pdf" | "pptx" | "xlsx" | "docx" | "image" | "file" = "file";
    if (ext === "pdf") fileType = "pdf";
    else if (["xlsx", "xls", "csv"].includes(ext)) fileType = "xlsx";
    else if (["docx", "doc"].includes(ext)) fileType = "docx";
    else if (["pptx", "ppt"].includes(ext)) fileType = "pptx";
    else if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) fileType = "image";

    const formattedSize =
      file.size < 1024 * 1024
        ? `${Math.max(1, Math.round(file.size / 1024))} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    setComposeAttachment({
      name: file.name,
      size: formattedSize,
      type: fileType,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    });

    e.target.value = "";
  };

  const handleRefineWithAi = async () => {
    if (isAiRefining) return;
    setIsAiRefining(true);
    setPreviousBody(composeBody);

    try {
      const textToRefine =
        composeBody.trim() ||
        (composeSubject.trim()
          ? `Redactar comunicado oficial sobre: "${composeSubject.trim()}". Normativa y redacción institucional MEP.`
          : "Cierre de actas de calificaciones y directrices oficiales para el personal docente.");

      const res = await fetch("/api/ai/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToRefine,
          subject: composeSubject.trim() || "Circular Oficial",
          tone: "formal",
        }),
      });

      if (!res.ok) throw new Error("Error en el servicio de IA");

      const data = await res.json();
      if (data.refinedText) {
        setComposeBody(data.refinedText);
        if (!composeSubject.trim()) {
          setComposeSubject("Circular Oficial • Cierre Trimestral y Actas");
        }
      }
    } catch {
      // Error handling without spamming toasts
    } finally {
      setIsAiRefining(false);
    }
  };

  const handleUndoAi = () => {
    if (previousBody !== null) {
      setComposeBody(previousBody);
      setPreviousBody(null);
    }
  };

  const filteredMessages = React.useMemo(() => {
    return messages.filter((m) => {
      if (m.category !== currentCategory) return false;
      if (searchFilter.trim()) {
        const q = searchFilter.toLowerCase();
        return (
          m.senderName.toLowerCase().includes(q) ||
          m.subject.toLowerCase().includes(q) ||
          m.snippet.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [messages, currentCategory, searchFilter]);

  const selectedMessage = React.useMemo(() => {
    if (!selectedMessageId) return null;
    return filteredMessages.find((m) => m.id === selectedMessageId) ?? null;
  }, [selectedMessageId, filteredMessages]);

  const handleSelectMessage = (id: string) => {
    setSelectedMessageId(id);
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isUnread: false } : m))
    );
  };

  const handleArchiveMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessageId === id) setSelectedMessageId(null);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selectedMessageId === id) setSelectedMessageId(null);
  };

  const handleToggleUnread = (id: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isUnread: !m.isUnread } : m))
    );
  };

  const handleSendQuickReply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!quickReplyText.trim() || isReplying || !selectedMessage) return;

    setIsReplying(true);

    setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

      const trimmed = quickReplyText.trim();
      const shouldAppendSig =
        myProfile.useSignature &&
        myProfile.signature.trim() &&
        !trimmed.includes(myProfile.signature.trim().split("\n")[0]);
      const finalBody = shouldAppendSig
        ? `${trimmed}\n\n${myProfile.signature.trim()}`
        : trimmed;

      const newReply: ThreadReplyItem = {
        id: `rep-${Date.now()}`,
        senderName: `${myProfile.name} (Tú)`,
        senderEmail: ME_EMAIL,
        isMe: true,
        timeLabel: timeStr,
        fullDateLabel: `Hoy a las ${timeStr}`,
        body: finalBody,
        attachment: replyAttachment || undefined,
      };

      setMessages((prev) =>
        prev.map((m) => {
          if (m.id === selectedMessage.id) {
            const currentReplies = m.replies || [];
            return {
              ...m,
              snippet: `Tú: ${quickReplyText.trim().slice(0, 80)}...`,
              replies: [...currentReplies, newReply],
            };
          }
          return m;
        })
      );

      setQuickReplyText("");
      setReplyAttachment(null);
      setIsReplying(false);

      // Smooth scroll down to newest reply
      setTimeout(() => {
        threadBottomRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 60);

    }, 280);
  };

  const handleReplyFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    let fileType: "pdf" | "pptx" | "xlsx" | "docx" | "image" | "file" = "file";
    if (ext === "pdf") {
      fileType = "pdf";
    } else if (["xlsx", "xls", "csv"].includes(ext)) {
      fileType = "xlsx";
    } else if (["docx", "doc"].includes(ext)) {
      fileType = "docx";
    } else if (["pptx", "ppt"].includes(ext)) {
      fileType = "pptx";
    } else if (["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext)) {
      fileType = "image";
    }

    const formattedSize =
      file.size < 1024 * 1024
        ? `${Math.max(1, Math.round(file.size / 1024))} KB`
        : `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

    setReplyAttachment({
      name: file.name,
      size: formattedSize,
      type: fileType,
      url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
    });

    e.target.value = "";
  };

  const handleRefineReplyWithAi = async () => {
    if (!selectedMessage || isAiRefiningReply) return;
    setIsAiRefiningReply(true);

    try {
      const textToRefine =
        quickReplyText.trim() ||
        `Responder afirmativamente al comunicado: "${selectedMessage.subject}". Confirmar recepción conforme y dar seguimiento institucional.`;

      const res = await fetch("/api/ai/refine", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToRefine,
          subject: `Re: ${selectedMessage.subject}`,
          tone: "formal",
        }),
      });

      if (!res.ok) throw new Error("Error en servicio de IA");

      const data = await res.json();
      if (data.refinedText) {
        setQuickReplyText(data.refinedText);
      }
    } catch {
      // Clean silent error or state reset without toast spam
    } finally {
      setIsAiRefiningReply(false);
    }
  };

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeSubject.trim() || !composeBody.trim()) return;
    setComposeSending(true);

    setTimeout(() => {
      const newMessage: CommunicationMessage = {
        id: `msg-${Date.now()}`,
        senderName: "M.Sc. Mariana Solís (Dirección)",
        senderEmail: "direccion@nexus.ed.cr",
        senderAvatarText: "MS",
        senderAvatarBg: "#18181B",
        verified: true,
        timeLabel: "Ahora",
        fullDateLabel: "Hoy a las " + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        subject: composeSubject,
        snippet: composeBody.slice(0, 95) + "...",
        body: [composeBody],
        category: "sent",
        isUnread: false,
        attachment: composeAttachment || undefined,
      };

      setMessages((prev) => [newMessage, ...prev]);
      setComposeSending(false);
      setComposeOpen(false);
      setComposeSubject("");
      setComposeBody("");
      setComposeAttachment(null);
      setPreviousBody(null);
    }, 850);
  };

  // Avatars rendered with @avatune/pacovqzz-theme + brand icons (no verified badge)
  const renderAvatar = (msg: CommunicationMessage, sizeClass = "w-10 h-10") => {
    if (msg.senderName.includes("Deel")) {
      return (
        <div className={cn("relative shrink-0", sizeClass)}>
          <div className="w-full h-full rounded-full bg-[#7C3AED] flex items-center justify-center text-white font-bold text-[12px] shadow-xs ring-1 ring-black/5">
            deel.
          </div>
        </div>
      );
    }

    if (msg.senderName.includes("Substack")) {
      return (
        <div className={cn("relative shrink-0", sizeClass)}>
          <div className="w-full h-full rounded-full bg-[#EA580C] flex items-center justify-center text-white shadow-xs ring-1 ring-black/5">
            <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
              <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
            </svg>
          </div>
        </div>
      );
    }

    const pixelSize = sizeClass.includes("w-14")
      ? 56
      : sizeClass.includes("w-12")
      ? 48
      : sizeClass.includes("w-11")
      ? 44
      : 40;
    return (
      <NexusAvatar
        seed={msg.senderEmail || msg.senderName}
        size={pixelSize}
      />
    );
  };

  return (
    <div className="space-y-4">
      {/* 1. EXACT REFERENCE TOP SUBHEADER BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#ECEBE7] pb-3.5">
        {/* Left: [Inbox Icon] Inbox  •  14.171 emails (Clean, without any "Powered by") */}
        <div className="flex items-center gap-2.5 text-[14px] text-[#52504A]">
          <span className="flex items-center gap-2 font-semibold text-[#18181B]">
            <Tray weight="fill" className="w-4 h-4 text-[#18181B]" />
            <span>Inbox</span>
          </span>
          <span className="text-[#C2BFB6]">•</span>
          <span className="tabular-nums font-normal text-[#52504A]">
            <SlotText
              text="14.171 emails"
              options={{ duration: 300, stagger: 18 }}
            />
          </span>
        </div>

        {/* Right: [+ Compose]  [Inbox 14.171]  [Sent items]  [Drafts] */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Emil Kowalski Tactile Compose Button */}
          <Button
            type="button"
            variant="pill-dark"
            size="sm"
            onClick={() => {
              setComposeOpen(true);
              setComposeMinimized(false);
            }}
            className="gap-2 px-4 shadow-sm"
          >
            <PencilSimpleLine weight="bold" className="w-4 h-4" />
            <span>Compose</span>
          </Button>

          {/* Reference Category Switcher Pills */}
          <div className="inline-flex items-center gap-1 bg-[#F4F3F0] p-1 rounded-2xl border border-[#E8E7E2]">
            <button
              type="button"
              onClick={() => setCurrentCategory("inbox")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-all duration-140 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                currentCategory === "inbox"
                  ? "bg-white text-[#18181B] shadow-[0_1px_2px_rgba(24,24,27,0.04)] border border-[#ECEBE7]"
                  : "text-[#78756E] hover:text-[#18181B] hover:bg-white/60 border border-transparent"
              )}
            >
              <Tray weight={currentCategory === "inbox" ? "fill" : "regular"} className="w-3.5 h-3.5" />
              <span>Inbox 14.171</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentCategory("sent")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-all duration-140 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                currentCategory === "sent"
                  ? "bg-white text-[#18181B] shadow-[0_1px_2px_rgba(24,24,27,0.04)] border border-[#ECEBE7]"
                  : "text-[#78756E] hover:text-[#18181B] hover:bg-white/60 border border-transparent"
              )}
            >
              <PaperPlaneTilt weight={currentCategory === "sent" ? "fill" : "regular"} className="w-3.5 h-3.5" />
              <span>Sent items</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentCategory("drafts")}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12.5px] font-medium transition-all duration-140 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]",
                currentCategory === "drafts"
                  ? "bg-white text-[#18181B] shadow-[0_1px_2px_rgba(24,24,27,0.04)] border border-[#ECEBE7]"
                  : "text-[#78756E] hover:text-[#18181B] hover:bg-white/60 border border-transparent"
              )}
            >
              <NoteBlank weight={currentCategory === "drafts" ? "fill" : "regular"} className="w-3.5 h-3.5" />
              <span>Drafts</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. EXACT TWO-PANEL SPLIT COMPOSITION */}
      <div className="flex flex-col lg:flex-row gap-4 items-start w-full">
        {/* LEFT COLUMN: EMAIL LIST CARD (Fixed compact width 380px-410px, crisp and readable) */}
        <div className="w-full lg:w-[380px] xl:w-[410px] shrink-0 bg-white border border-[#ECECE9] rounded-[20px] overflow-hidden shadow-xs flex flex-col">
          {/* Card Header: Checkbox + Inbox + Filter Icon */}
          <div className="px-4 py-3 border-b border-[#F4F3F0] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                aria-label="Select all messages"
                className="w-4 h-4 rounded border-[#D4D2C9] text-[#18181B] focus:ring-zinc-900 cursor-pointer"
              />
              <span className="text-[13.5px] font-semibold text-[#18181B]">Inbox</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-36 sm:w-44">
                <Input
                  variant="subtle"
                  placeholder="Search mail..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  icon={<MagnifyingGlass weight="bold" className="w-3 h-3 text-[#78756E]" />}
                  className="h-7 text-[12px]"
                />
              </div>
              <button
                type="button"
                aria-label="Filter options"
                className="w-7 h-7 rounded-lg hover:bg-[#F4F3F0] flex items-center justify-center text-[#78756E] hover:text-[#18181B] active:scale-[0.95] transition-all duration-140"
              >
                <List weight="bold" className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* EXACT REFERENCE UPGRADE WITH AI BANNER (Using the generated anime sky image) */}
          <div className="p-3 border-b border-[#F4F3F0]">
            <div className="relative overflow-hidden rounded-[16px] h-[106px] w-full border border-black/[0.04] shadow-xs select-none">
              {/* Anime Sky Banner Background */}
              <Image
                src="/images/inbox-ai-banner.png"
                alt="Upgrade with AI scenery"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover object-center"
              />
              {/* Soft bottom fade overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-white/40 to-transparent pointer-events-none" />

              {/* Banner Text Overlay (Exact Reference Typography) */}
              <div className="absolute inset-0 p-3.5 flex flex-col justify-end z-10">
                <div className="text-[16px] font-bold tracking-tight text-[#0F172A] leading-tight">
                  Upgrade with AI
                </div>
                <div className="text-[12.5px] font-medium text-[#475569] leading-tight mt-0.5">
                  For more powerful Inbox
                </div>
              </div>
            </div>
          </div>

          {/* EXACT REFERENCE THREADS LIST */}
          <div className="divide-y divide-[#F4F3F0] max-h-[560px] overflow-y-auto no-scrollbar">
            {filteredMessages.length === 0 ? (
              <div className="py-16 text-center text-[13px] text-[#78756E]">
                No messages found in {currentCategory}.
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = msg.id === selectedMessage?.id;
                return (
                  <div
                    key={msg.id}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleSelectMessage(msg.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleSelectMessage(msg.id);
                      }
                    }}
                    className={cn(
                      "w-full text-left p-4 flex items-start gap-3.5 transition-colors duration-150 relative cursor-pointer",
                      isSelected
                        ? "bg-[#F6F5F0]"
                        : "hover:bg-[#FCFBF9] bg-white"
                    )}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="inbox-selected-bar"
                        transition={{
                          type: "spring",
                          stiffness: 520,
                          damping: 36,
                        }}
                        className="absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-[#18181B]"
                      />
                    )}
                    {/* Circle Avatar with Blue Verified Badge */}
                    {renderAvatar(msg, "w-10 h-10")}

                    {/* Sender, Time, Email, and Snippet */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenProfile?.(msg.senderEmail, msg.senderName);
                          }}
                          className={cn(
                            "text-[13.5px] truncate hover:underline underline-offset-2 decoration-[#C2BFB6] text-left",
                            msg.isUnread ? "font-bold text-[#18181B]" : "font-semibold text-[#1E293B]"
                          )}
                        >
                          {msg.senderName}
                        </button>
                        <span className="text-[11.5px] text-[#78756E] shrink-0 font-normal tabular-nums">
                          {msg.timeLabel}
                        </span>
                      </div>

                      <div className="text-[12px] text-[#78756E] truncate mb-1">
                        {msg.senderEmail}
                      </div>

                      <p
                        className={cn(
                          "text-[12.5px] line-clamp-2 leading-snug",
                          msg.isUnread ? "text-[#18181B] font-medium" : "text-[#475569]"
                        )}
                      >
                        {msg.snippet}
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: READING PANE & THREAD CONVERSATION CARD */}
        <div className="flex-1 min-w-0 w-full bg-white border border-[#ECECE9] rounded-[20px] p-6 shadow-xs flex flex-col justify-between min-h-[640px] max-h-[820px] overflow-hidden">
          {selectedMessage ? (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 36,
                mass: 0.7,
              }}
              className="flex-1 flex flex-col min-h-0"
            >
                {/* Top Action Buttons (Archive, Delete, Mark as unread, Close) */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#F4F3F0] shrink-0">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleArchiveMessage(selectedMessage.id)}
                      aria-label="Archive message"
                      title="Archivar"
                      className="w-9 h-9 rounded-xl border border-[#ECECE9] bg-white hover:bg-[#FAF9F6] hover:border-[#DFDDD6] flex items-center justify-center text-[#52504A] hover:text-[#18181B] shadow-2xs press-scale transition-colors"
                    >
                      <Archive weight="regular" className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteMessage(selectedMessage.id)}
                      aria-label="Delete message"
                      title="Eliminar"
                      className="w-9 h-9 rounded-xl border border-[#ECECE9] bg-white hover:bg-[#FEE4E2] hover:border-[#FCA5A5] flex items-center justify-center text-[#52504A] hover:text-[#D92D20] shadow-2xs press-scale transition-colors"
                    >
                      <Trash weight="regular" className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleUnread(selectedMessage.id)}
                      aria-label="Mark as unread"
                      title="Marcar como no leído"
                      className="w-9 h-9 rounded-xl border border-[#ECECE9] bg-white hover:bg-[#FAF9F6] hover:border-[#DFDDD6] flex items-center justify-center text-[#52504A] hover:text-[#18181B] shadow-2xs press-scale transition-colors"
                    >
                      {selectedMessage.isUnread ? (
                        <EnvelopeOpen weight="regular" className="w-4 h-4" />
                      ) : (
                        <EnvelopeSimple weight="regular" className="w-4 h-4" />
                      )}
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <div className="text-[12px] text-[#78756E] tabular-nums">
                      {selectedMessage.fullDateLabel}
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedMessageId(null)}
                      title="Cerrar correo"
                      aria-label="Cerrar correo"
                      className="w-8 h-8 rounded-xl border border-[#ECECE9] bg-white hover:bg-[#FAF9F6] flex items-center justify-center text-[#78756E] hover:text-[#18181B] press-scale transition-colors"
                    >
                      <X weight="bold" className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              {/* Scrollable Conversation Thread Container */}
              <div className="flex-1 overflow-y-auto overscroll-contain py-4 space-y-6 no-scrollbar min-h-0">
                {/* 1. Original Message Details */}
                <div className="space-y-4">
                  <button
                    type="button"
                    onClick={() => onOpenProfile?.(selectedMessage.senderEmail, selectedMessage.senderName)}
                    className="group flex items-center gap-3.5 text-left rounded-xl -m-1 p-1"
                  >
                    {renderAvatar(selectedMessage, "w-11 h-11")}
                    <div className="min-w-0">
                      <div className="text-[15px] font-semibold text-[#18181B] truncate group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                        {selectedMessage.senderName}
                      </div>
                      <div className="text-[12.5px] text-[#78756E]">
                        De: <span className="text-[#52504A]">{selectedMessage.senderEmail}</span>
                      </div>
                    </div>
                  </button>

                  <div>
                    <h2 className="text-[20px] sm:text-[22px] font-bold tracking-tight text-[#18181B] leading-snug">
                      {selectedMessage.subject}
                    </h2>
                  </div>

                  <div className="space-y-3.5 text-[14px] text-[#334155] leading-relaxed font-normal">
                    {selectedMessage.body.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {/* Attachment in original message with REAL BRAND BADGE */}
                  {selectedMessage.attachment && (
                    <div className="pt-2">
                      <div className="text-[11.5px] font-medium text-[#78756E] mb-2 flex items-center gap-1.5">
                        <span>Adjunto oficial</span>
                        <span className="text-[#A19E95]">•</span>
                        <span>Almacenamiento seguro</span>
                      </div>

                      <button
                        type="button"
                        className="group inline-flex items-center gap-3 text-left press-scale"
                      >
                        <BrandFileBadge
                          type={selectedMessage.attachment.type}
                          name={selectedMessage.attachment.name}
                          size={30}
                        />
                        <div className="min-w-0">
                          <div className="text-[13px] font-semibold text-[#18181B] truncate group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                            {selectedMessage.attachment.name}
                          </div>
                          <div className="text-[11px] text-[#78756E] tabular-nums">
                            {selectedMessage.attachment.size}
                          </div>
                        </div>
                        <DownloadSimple weight="bold" className="w-4 h-4 text-[#A19E95] group-hover:text-[#18181B] transition-colors ml-1" />
                      </button>
                    </div>
                  )}
                </div>

                {/* 2. Interactive Thread Replies History */}
                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center gap-3 py-1">
                      <div className="h-px flex-1 bg-[#ECEBE7]" />
                      <span className="text-[11px] font-medium uppercase tracking-wider text-[#78756E]">
                        {selectedMessage.replies.length === 1
                          ? "1 respuesta en el hilo"
                          : `${selectedMessage.replies.length} respuestas en el hilo`}
                      </span>
                      <div className="h-px flex-1 bg-[#ECEBE7]" />
                    </div>

                    <div className="space-y-3.5">
                      <AnimatePresence initial={false}>
                        {selectedMessage.replies.map((reply) => (
                          <motion.div
                            key={reply.id}
                            initial={{ opacity: 0, y: 12, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{
                              type: "spring",
                              stiffness: 420,
                              damping: 28,
                              mass: 0.7,
                            }}
                            className={cn(
                              "p-4 rounded-2xl border transition-all duration-150",
                              reply.isMe
                                ? "bg-[#FAF9F6] border-[#E8E6DF] ml-3 sm:ml-8"
                                : "bg-white border-[#ECECE9] mr-3 sm:mr-8"
                            )}
                          >
                            <div className="flex items-center justify-between gap-2 mb-2">
                              <button
                                type="button"
                                onClick={() => onOpenProfile?.(reply.senderEmail, reply.senderName)}
                                className="group flex items-center gap-2 text-left"
                              >
                                <NexusAvatar
                                  seed={reply.senderEmail}
                                  size={26}
                                />
                                <span className="text-[13px] font-semibold text-[#18181B] group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                                  {reply.senderName}
                                </span>
                                {reply.isMe && (
                                  <span className="text-[10.5px] font-medium px-1.5 py-0.5 rounded-md bg-[#18181B] text-white">
                                    Tú
                                  </span>
                                )}
                              </button>
                              <span className="text-[11px] text-[#78756E] tabular-nums font-mono">
                                {reply.fullDateLabel || reply.timeLabel}
                              </span>
                            </div>

                            <p className="text-[13.5px] text-[#334155] leading-relaxed whitespace-pre-wrap">
                              {reply.body}
                            </p>

                            {reply.attachment && (
                              <div className="mt-3 inline-flex items-center gap-2.5">
                                <BrandFileBadge
                                  type={reply.attachment.type}
                                  name={reply.attachment.name}
                                  size={26}
                                />
                                <span className="text-[12.5px] font-medium text-[#18181B]">
                                  {reply.attachment.name}
                                </span>
                                <span className="text-[11px] text-[#78756E] tabular-nums">
                                  ({reply.attachment.size})
                                </span>
                              </div>
                            )}
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* Anchor for auto-scroll */}
                <div ref={threadBottomRef} className="h-1" />
              </div>

              {/* 3. Modern, Minimalist Reply Composer Dock */}
              <div className="pt-3 border-t border-[#F4F3F0] shrink-0">
                <form onSubmit={handleSendQuickReply} className="space-y-2">
                  {/* Hidden Real File Input */}
                  <input
                    ref={replyFileInputRef}
                    type="file"
                    onChange={handleReplyFileChange}
                    className="hidden"
                    aria-hidden="true"
                  />

                  {/* Attached file preview chip */}
                  <AnimatePresence>
                    {replyAttachment && (
                      <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                        className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#ECECE9] shadow-2xs group"
                      >
                        <BrandFileBadge
                          type={replyAttachment.type}
                          name={replyAttachment.name}
                          size={20}
                        />
                        <div className="flex items-baseline gap-1.5 min-w-0">
                          <span className="text-[12.5px] font-medium text-[#18181B] truncate max-w-[260px]">
                            {replyAttachment.name}
                          </span>
                          <span className="text-[11px] text-[#78756E] tabular-nums">
                            ({replyAttachment.size})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setReplyAttachment(null)}
                          aria-label="Quitar archivo adjunto"
                          className="ml-1 w-4 h-4 rounded-full flex items-center justify-center text-[#78756E] hover:text-[#18181B] hover:bg-[#EAE8E3] transition-colors"
                        >
                          <X weight="bold" className="w-3 h-3" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Responsive Textarea with Ctrl+Enter support */}
                  <div className="relative rounded-2xl border border-[#ECECE9] bg-[#FAF9F6] focus-within:bg-white focus-within:border-[#E2E0DA] focus-within:shadow-[0_2px_10px_rgba(24,24,27,0.05)] transition-[background-color,box-shadow,border-color] duration-150 overflow-hidden">
                    <textarea
                      value={quickReplyText}
                      onChange={(e) => setQuickReplyText(e.target.value)}
                      readOnly={isAiRefiningReply}
                      onKeyDown={(e) => {
                        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                          e.preventDefault();
                          handleSendQuickReply();
                        }
                      }}
                      placeholder={`Responder a ${selectedMessage.senderName}... (Ctrl + Enter)`}
                      rows={2}
                      className={cn(
                        "w-full bg-transparent px-3.5 pt-3 pb-2 text-[13.5px] text-[#18181B] placeholder:text-[#A19E95] outline-none focus:outline-none focus-visible:outline-none focus:ring-0 border-0 resize-none leading-relaxed caret-[#18181B] transition-opacity duration-200",
                        isAiRefiningReply && "opacity-60 cursor-wait"
                      )}
                    />

                    {/* Modern Hairline Progress Beam while refining */}
                    <div className="h-[2px] w-full bg-[#F0EFEB]/80 overflow-hidden relative">
                      {isAiRefiningReply && (
                        <motion.div
                          className="absolute inset-y-0 bg-gradient-to-r from-transparent via-[#18181B] to-transparent w-1/2"
                          animate={{ x: ["-100%", "300%"] }}
                          transition={{ repeat: Infinity, duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
                        />
                      )}
                    </div>

                    {/* Bottom action bar inside composer */}
                    <div className="flex items-center justify-between px-3 py-2 bg-white/70">
                      {/* Left actions: AI & Attachment */}
                      <div className="flex items-center gap-1.5">
                        {/* AI Improve Button: One direct action, modern loading animation */}
                        <button
                          type="button"
                          onClick={handleRefineReplyWithAi}
                          disabled={isAiRefiningReply}
                          className={cn(
                            "relative overflow-hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200 select-none",
                            isAiRefiningReply
                              ? "bg-[#18181B] text-white shadow-2xs cursor-wait"
                              : "text-[#78756E] hover:text-[#18181B] hover:bg-[#F4F3F0] press-scale"
                          )}
                          title="Mejorar redacción automáticamente con IA"
                        >
                          {isAiRefiningReply ? (
                            <>
                              <motion.span
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                animate={{ x: ["-100%", "200%"] }}
                                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                              />
                              <Sparkle
                                weight="fill"
                                className="w-3.5 h-3.5 text-white animate-spin shrink-0"
                                style={{ animationDuration: "2.4s" }}
                              />
                              <span className="relative z-10 text-[11.5px] font-medium tracking-tight">
                                Mejorando redacción...
                              </span>
                            </>
                          ) : (
                            <>
                              <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#52504A]" />
                              <span>Mejorar con IA</span>
                            </>
                          )}
                        </button>

                        {/* Attach button */}
                        <button
                          type="button"
                          onClick={() => replyFileInputRef.current?.click()}
                          className={cn(
                            "inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-medium transition-colors select-none",
                            replyAttachment
                              ? "bg-[#F4F3F0] text-[#18181B]"
                              : "text-[#78756E] hover:text-[#18181B] hover:bg-[#F4F3F0]"
                          )}
                          title="Adjuntar archivo desde tu equipo"
                        >
                          <Paperclip weight="bold" className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Adjuntar</span>
                        </button>

                        {/* Insert Signature button */}
                        {myProfile.signature.trim() && (
                          <button
                            type="button"
                            onClick={() => {
                              const sig = myProfile.signature.trim();
                              if (!quickReplyText.includes(sig)) {
                                setQuickReplyText((prev) =>
                                  prev.trim() ? `${prev.trim()}\n\n${sig}` : sig
                                );
                              }
                            }}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-[12px] font-medium text-[#78756E] hover:text-[#18181B] hover:bg-[#F4F3F0] transition-colors"
                            title="Insertar firma configurada en Mi Perfil"
                          >
                            <Signature weight="bold" className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Firma</span>
                          </button>
                        )}
                      </div>

                      {/* Right: Shortcut hint + Send button */}
                      <div className="flex items-center gap-2.5">
                        <span className="text-[11px] font-mono text-[#A19E95] hidden sm:inline select-none">
                          Ctrl + Enter
                        </span>
                        <Button
                          type="button"
                          onClick={() => handleSendQuickReply()}
                          variant="pill-dark"
                          size="sm"
                          disabled={!quickReplyText.trim() || isReplying}
                          className="px-3.5 py-1.5 h-8 gap-1.5 text-[12.5px] shadow-xs"
                        >
                          <PaperPlaneRight weight="fill" className="w-3.5 h-3.5" />
                          <SlotText
                            text={isReplying ? "Enviando..." : "Responder"}
                            options={{ duration: 200, stagger: 14 }}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-reading-pane"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="flex-1 flex flex-col items-center justify-center text-center px-6 py-12 select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#FAF9F6] border border-[#ECECE9] flex items-center justify-center text-[#78756E] mb-3.5 shadow-2xs">
                <EnvelopeOpen weight="regular" className="w-5 h-5" />
              </div>
              <h3 className="text-[15px] font-semibold text-[#18181B]">
                Selecciona un correo para visualizarlo
              </h3>
              <p className="text-[13px] text-[#78756E] max-w-[34ch] mt-1 leading-relaxed">
                Elige cualquier conversación de la bandeja izquierda para leer el hilo completo, revisar adjuntos o responder.
              </p>
            </motion.div>
          )}
        </div>

        {/* RIGHT COLUMN: EDITORIAL INSPECTOR PANEL (Framed cover banner, zero button overlap, no verified badge) */}
        {selectedMessage && (() => {
          const contactProfile = getProfile(
            selectedMessage.senderEmail,
            selectedMessage.senderName
          );
          const isSenderMe = selectedMessage.senderEmail === ME_EMAIL;
          const senderRole = isSenderMe ? myProfile.role : contactProfile.role;
          const senderStatusText = isSenderMe
            ? myProfile.statusText
            : contactProfile.statusText ?? "Canal activo";

          return (
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 520,
                damping: 36,
                mass: 0.7,
              }}
              className="hidden 2xl:flex w-[320px] shrink-0 flex-col bg-white border border-[#ECECE9] rounded-2xl overflow-hidden shadow-xs"
            >
              {/* Top Cover Banner (flush with rounded card top) */}
              <ProfileBanner
                seed={selectedMessage.senderEmail}
                className="h-24 w-full shrink-0 rounded-t-2xl"
              />

              <div className="px-5 pb-5 space-y-4">
                {/* Avatar overlapping banner + 'Ver perfil' sitting cleanly in white space */}
                <div className="flex items-start justify-between gap-2 pt-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenProfile?.(
                        selectedMessage.senderEmail,
                        selectedMessage.senderName
                      )
                    }
                    className="-mt-10 relative z-10 rounded-full ring-4 ring-white bg-white press-scale shadow-2xs"
                    aria-label={`Ver perfil de ${selectedMessage.senderName}`}
                  >
                    {renderAvatar(
                      { ...selectedMessage, verified: false },
                      "w-14 h-14"
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      onOpenProfile?.(
                        selectedMessage.senderEmail,
                        selectedMessage.senderName
                      )
                    }
                    className="h-7 px-3 rounded-full border border-[#DFDDD6] bg-white hover:bg-[#FAF9F6] text-[11.5px] font-semibold text-[#18181B] press-scale transition-colors shadow-2xs"
                  >
                    Ver perfil
                  </button>
                </div>

                {/* Identity & Role (No verified badge anywhere) */}
                <div>
                  <button
                    type="button"
                    onClick={() =>
                      onOpenProfile?.(
                        selectedMessage.senderEmail,
                        selectedMessage.senderName
                      )
                    }
                    className="group inline-flex items-center gap-1.5 text-left max-w-full"
                  >
                    <span className="text-[14.5px] font-bold text-[#18181B] truncate group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                      {isSenderMe ? myProfile.name : selectedMessage.senderName}
                    </span>
                  </button>
                  <div className="text-[12px] text-[#78756E] truncate">
                    {selectedMessage.senderEmail}
                  </div>
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F4F3F0] text-[11px] font-medium text-[#52504A]">
                      {senderRole}
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-[#F4F3F0] text-[11px] font-medium text-[#52504A]">
                      {senderStatusText}
                    </span>
                  </div>
                </div>

                {/* Real Brand Attachments & Documents (Free logos, no containers) */}
                <div className="space-y-2.5 pt-3 border-t border-[#F4F3F0]">
                  <div className="text-[11px] font-semibold uppercase tracking-wider text-[#78756E]">
                    Archivos vinculados
                  </div>

                  <div className="space-y-3 pt-0.5">
                    {/* Message attachment if present */}
                    {selectedMessage.attachment && (
                      <button
                        type="button"
                        className="group w-full flex items-center justify-between gap-3 text-left py-1 press-scale"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <BrandFileBadge
                            type={selectedMessage.attachment.type}
                            name={selectedMessage.attachment.name}
                            size={28}
                          />
                          <div className="min-w-0">
                            <div className="text-[12.5px] font-medium text-[#18181B] truncate group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                              {selectedMessage.attachment.name}
                            </div>
                            <div className="text-[11px] text-[#78756E] tabular-nums">
                              {selectedMessage.attachment.size} • Adjunto actual
                            </div>
                          </div>
                        </div>
                        <DownloadSimple
                          weight="bold"
                          className="w-3.5 h-3.5 text-[#A19E95] group-hover:text-[#18181B] transition-colors shrink-0"
                        />
                      </button>
                    )}

                    {/* Real PDF: Circular MEP */}
                    <button
                      type="button"
                      className="group w-full flex items-center justify-between gap-3 text-left py-1 press-scale"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <AdobePdfIcon size={28} />
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-medium text-[#18181B] truncate group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                            Circular_MEP_CR_2026.pdf
                          </div>
                          <div className="text-[11px] text-[#78756E] tabular-nums">
                            1.8 MB • Circular Oficial
                          </div>
                        </div>
                      </div>
                      <DownloadSimple
                        weight="bold"
                        className="w-3.5 h-3.5 text-[#A19E95] group-hover:text-[#18181B] transition-colors shrink-0"
                      />
                    </button>

                    {/* Real Excel: Acta Sección */}
                    <button
                      type="button"
                      className="group w-full flex items-center justify-between gap-3 text-left py-1 press-scale"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <MicrosoftExcelIcon size={28} />
                        <div className="min-w-0">
                          <div className="text-[12.5px] font-medium text-[#18181B] truncate group-hover:underline underline-offset-2 decoration-[#C2BFB6]">
                            Acta_Seccion_10_2.xlsx
                          </div>
                          <div className="text-[11px] text-[#78756E] tabular-nums">
                            640 KB • Padrón MEP
                          </div>
                        </div>
                      </div>
                      <DownloadSimple
                        weight="bold"
                        className="w-3.5 h-3.5 text-[#A19E95] group-hover:text-[#18181B] transition-colors shrink-0"
                      />
                    </button>
                  </div>
                </div>

                {/* Minimalist Quick Link */}
                <div className="pt-2 border-t border-[#F4F3F0]">
                  <button
                    type="button"
                    className="w-full h-8 px-3 rounded-xl border border-[#ECECE9] hover:bg-[#FAF9F6] text-[12px] font-medium text-[#18181B] flex items-center justify-between transition-colors press-scale"
                  >
                    <span>Ver expediente académico</span>
                    <ArrowUpRight weight="bold" className="w-3.5 h-3.5 text-[#78756E]" />
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </div>

      {/* 3. MODERN, NATIVE-FEELING FLOATING COMPOSE WINDOW WITH SMOOTH EXIT/ENTRANCE ANIMATION */}
      <AnimatePresence>
        {composeOpen && (
          <div className="fixed inset-0 z-50 pointer-events-none flex items-end justify-end p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                height: composeMinimized ? 48 : 520,
              }}
              exit={{
                opacity: 0,
                y: 16,
                scale: 0.98,
                transition: { duration: 0.16, ease: [0.16, 1, 0.3, 1] },
              }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 34,
                mass: 0.7,
              }}
              className="pointer-events-auto w-full sm:w-[600px] md:w-[630px] max-w-[calc(100vw-2rem)] bg-white border border-[#DFDDD6] rounded-2xl shadow-floating flex flex-col overflow-hidden will-change-transform"
            >
              {/* Header Bar */}
              <div className="h-12 px-4 bg-[#18181B] text-white flex items-center justify-between gap-3 shrink-0 select-none">
                <div className="flex items-center gap-2">
                  <PencilSimpleLine weight="bold" className="w-4 h-4 text-white/90" />
                  <span className="text-[13.5px] font-semibold tracking-tight">Nuevo Comunicado</span>
                </div>

                <div className="flex items-center gap-1 text-white/70">
                  <button
                    type="button"
                    onClick={() => setComposeMinimized((prev) => !prev)}
                    aria-label="Minimizar redacción"
                    className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                  >
                    <Minus weight="bold" className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    aria-label="Maximizar lienzo"
                    className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                  >
                    <ArrowsOutSimple weight="bold" className="w-3.5 h-3.5" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setComposeOpen(false)}
                    aria-label="Cerrar redactor"
                    className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center hover:text-white transition-colors"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Body form (only shown when not minimized) */}
              {!composeMinimized && (
                <form
                  onSubmit={handleSendCompose}
                  className="flex-1 flex flex-col justify-between p-3.5 sm:p-4 overflow-hidden min-h-0"
                >
                  {/* Real File Input for Compose */}
                  <input
                    ref={composeFileInputRef}
                    type="file"
                    onChange={handleComposeFileChange}
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="space-y-2.5 flex-1 flex flex-col min-h-0">
                    {/* Recipient Row - Clean & Borderless (No black outlines) */}
                    <div className="flex items-center gap-2 px-1 py-1 border-b border-[#F1F0EC] text-[13px] shrink-0">
                      <span className="text-[#78756E] w-12 font-medium shrink-0 select-none">Para:</span>
                      <input
                        type="text"
                        value={composeTo}
                        onChange={(e) => setComposeTo(e.target.value)}
                        placeholder="Nombre o correo institucional..."
                        className="flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-[13px] font-medium text-[#18181B] placeholder:text-[#A19E95] p-0"
                      />
                    </div>

                    {/* Quick Recipient Suggestion Chips */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 text-[11px] shrink-0 select-none">
                      <span className="text-[#A19E95] text-[10.5px] uppercase tracking-wider shrink-0 font-medium">Sugerencias:</span>
                      {[
                        { label: "Valeria Mora (Matemáticas)", email: "Valeria Mora (vmora@nexus.ed.cr)" },
                        { label: "Despacho MEP", email: "Despacho Ministerial MEP (circulares@mep.go.cr)" },
                        { label: "Rico Oktananda", email: "Rico Oktananda (rico.oktananda1@gmail.com)" },
                        { label: "Comité Evaluación", email: "Comité de Evaluación (evaluacion@nexus.ed.cr)" },
                      ].map((c) => (
                        <button
                          key={c.email}
                          type="button"
                          onClick={() => setComposeTo(c.email)}
                          className={cn(
                            "px-2 py-0.5 rounded-md border text-[11px] transition-colors shrink-0",
                            composeTo.includes(c.email)
                              ? "bg-[#18181B] text-white border-[#18181B]"
                              : "bg-[#FAF9F6] border-[#ECECE9] text-[#52504A] hover:text-[#18181B] hover:border-[#DFDDD6]"
                          )}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>

                    {/* Subject Row - Clean & Borderless */}
                    <div className="flex items-center gap-2 px-1 py-1 border-b border-[#F1F0EC] text-[13px] shrink-0">
                      <span className="text-[#78756E] w-12 font-medium shrink-0 select-none">Asunto:</span>
                      <input
                        type="text"
                        required
                        value={composeSubject}
                        onChange={(e) => setComposeSubject(e.target.value)}
                        placeholder="Revisión de actas o lineamientos académicos..."
                        className="flex-1 bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-[13px] font-medium text-[#18181B] placeholder:text-[#A19E95] p-0"
                      />
                    </div>

                    {/* Attached file preview chip */}
                    <AnimatePresence>
                      {composeAttachment && (
                        <motion.div
                          initial={{ opacity: 0, y: -4, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -4, scale: 0.98 }}
                          transition={{ duration: 0.16 }}
                          className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-[#FAF9F6] border border-[#ECECE9] shadow-2xs group w-fit"
                        >
                          <BrandFileBadge
                            type={composeAttachment.type}
                            name={composeAttachment.name}
                            size={18}
                          />
                          <span className="text-[12px] font-medium text-[#18181B] truncate max-w-[260px]">
                            {composeAttachment.name}
                          </span>
                          <span className="text-[11px] text-[#78756E] tabular-nums">
                            ({composeAttachment.size})
                          </span>
                          <button
                            type="button"
                            onClick={() => setComposeAttachment(null)}
                            aria-label="Quitar archivo adjunto"
                            className="ml-1 w-4 h-4 rounded-full flex items-center justify-center text-[#78756E] hover:text-[#18181B] hover:bg-[#EAE8E3] transition-colors"
                          >
                            <X weight="bold" className="w-2.5 h-2.5" />
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Editor Textarea without harsh boxes or borders */}
                    <div className="flex-1 pt-1 flex flex-col min-h-0 relative">
                      <textarea
                        required
                        value={composeBody}
                        onChange={(e) => setComposeBody(e.target.value)}
                        onKeyDown={(e) => {
                          if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
                            e.preventDefault();
                            handleSendCompose(e as never);
                          }
                        }}
                        readOnly={isAiRefining}
                        placeholder="Redacta el comunicado oficial aquí, o pulsa 'Redactar con IA' para generar una propuesta institucional..."
                        className={cn(
                          "w-full flex-1 min-h-[140px] resize-none text-[13.5px] bg-transparent border-0 outline-none focus:outline-none focus:ring-0 text-[#18181B] placeholder:text-[#A19E95] leading-relaxed p-1 caret-[#18181B] transition-opacity duration-200",
                          isAiRefining && "opacity-60 cursor-wait"
                        )}
                      />
                    </div>
                  </div>

                  {/* Hairline Progress Beam while AI is writing */}
                  <div className="h-[2px] w-full bg-[#F0EFEB]/80 overflow-hidden relative mt-1 shrink-0">
                    {isAiRefining && (
                      <motion.div
                        className="absolute inset-y-0 bg-gradient-to-r from-transparent via-[#18181B] to-transparent w-1/2"
                        animate={{ x: ["-100%", "300%"] }}
                        transition={{ repeat: Infinity, duration: 1.3, ease: [0.4, 0, 0.2, 1] }}
                      />
                    )}
                  </div>

                  {/* Footer Toolbar & Send Button */}
                  <div className="pt-3 mt-1 border-t border-[#F1F0EC] flex items-center justify-between gap-2 shrink-0">
                    <div className="flex items-center gap-1.5 text-[#78756E] relative shrink-0">
                      {/* Real Attach Button */}
                      <button
                        type="button"
                        onClick={() => composeFileInputRef.current?.click()}
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-medium transition-colors select-none",
                          composeAttachment
                            ? "bg-[#F4F3F0] text-[#18181B]"
                            : "text-[#78756E] hover:text-[#18181B] hover:bg-[#F4F3F0]"
                        )}
                        title="Adjuntar archivo desde tu equipo"
                      >
                        <Paperclip weight="bold" className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Adjuntar</span>
                      </button>

                      {/* Single Direct AI Button (Clean, modern loading state) */}
                      <button
                        type="button"
                        disabled={isAiRefining}
                        onClick={handleRefineWithAi}
                        className={cn(
                          "relative overflow-hidden inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[12px] font-medium transition-all duration-200 select-none",
                          isAiRefining
                            ? "bg-[#18181B] text-white shadow-2xs cursor-wait"
                            : "bg-white hover:bg-[#FAF9F6] border border-[#ECECE9] hover:border-[#DFDDD6] text-[#18181B] shadow-2xs press-scale"
                        )}
                        title="Redactar o mejorar comunicado automáticamente con IA"
                      >
                        {isAiRefining ? (
                          <>
                            <motion.span
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              animate={{ x: ["-100%", "200%"] }}
                              transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                            />
                            <Sparkle
                              weight="fill"
                              className="w-3.5 h-3.5 text-white animate-spin shrink-0"
                              style={{ animationDuration: "2.4s" }}
                            />
                            <span className="relative z-10 text-[11.5px] font-medium tracking-tight">
                              {composeBody.trim() ? "Mejorando..." : "Redactando..."}
                            </span>
                          </>
                        ) : (
                          <>
                            <Sparkle weight="fill" className="w-3.5 h-3.5 text-[#52504A]" />
                            <span>{composeBody.trim() ? "Mejorar con IA" : "Redactar con IA"}</span>
                          </>
                        )}
                      </button>

                      {/* Insert Signature Button */}
                      {myProfile.signature.trim() && (
                        <button
                          type="button"
                          onClick={() => {
                            const sig = myProfile.signature.trim();
                            if (!composeBody.includes(sig)) {
                              setComposeBody((prev) =>
                                prev.trim() ? `${prev.trim()}\n\n${sig}` : sig
                              );
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-[12px] font-medium text-[#78756E] hover:text-[#18181B] hover:bg-[#F4F3F0] transition-colors"
                          title="Insertar firma configurada en Mi Perfil"
                        >
                          <Signature weight="bold" className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Firma</span>
                        </button>
                      )}

                      {/* Undo AI button */}
                      {previousBody !== null && (
                        <button
                          type="button"
                          onClick={handleUndoAi}
                          className="inline-flex items-center gap-1 text-[11.5px] text-[#78756E] hover:text-[#18181B] px-2 py-1.5 rounded-xl hover:bg-[#F4F3F0] transition-colors shrink-0"
                          title="Restaurar borrador original"
                        >
                          <ArrowCounterClockwise weight="bold" className="w-3 h-3" />
                          <span>Deshacer</span>
                        </button>
                      )}
                    </div>

                    {/* Right actions: Shortcut hint + Descartar + Enviar */}
                    <div className="flex items-center gap-2 shrink-0 ml-auto">
                      <span className="text-[11px] font-mono text-[#A19E95] hidden lg:inline select-none">
                        Ctrl + Enter
                      </span>

                      <Button
                        type="button"
                        variant="ghost"
                        size="xs"
                        onClick={() => setComposeOpen(false)}
                        className="text-[#78756E] hover:text-[#18181B] px-2.5 h-8 text-[12px] shrink-0"
                      >
                        Descartar
                      </Button>

                      <Button
                        type="submit"
                        variant="pill-dark"
                        size="sm"
                        disabled={composeSending || isAiRefining}
                        className="h-8 px-4 gap-1.5 shrink-0 shadow-xs"
                      >
                        <PaperPlaneRight weight="bold" className="w-3.5 h-3.5 shrink-0" />
                        <span className="text-[12.5px] font-medium shrink-0 whitespace-nowrap">
                          {composeSending ? "Enviando..." : "Enviar"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
