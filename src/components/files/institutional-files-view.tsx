"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Folder,
  FolderOpen,
  Plus,
  MagnifyingGlass,
  Tag,
  CaretRight,
  CaretDown,
  UploadSimple,
  DownloadSimple,
  Eye,
  Trash,
  X,
  SidebarSimple,
  ShieldCheck,
  Table,
  SquaresFour,
  ListBullets,
  ArrowBendUpLeft,
  Check,
} from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { NexusAvatar } from "@/components/ui/nexus-avatar";
import {
  BrandFileBadge,
  AdobePdfIcon,
  MicrosoftExcelIcon,
  MicrosoftWordIcon,
  MicrosoftPowerPointIcon,
} from "@/components/ui/brand-file-icons";
import {
  INITIAL_FOLDERS,
  INITIAL_FILES,
  InstitutionalFolder,
  InstitutionalFile,
} from "@/lib/mock/institutional-files";
import { useProfileStore, ME_EMAIL } from "@/lib/profile-store";

// ============================================================================
// Tactile Physical Folder Card (Directly matching the user's reference image)
// ============================================================================
interface TactileFolderProps {
  folder: InstitutionalFolder;
  isActive: boolean;
  isOpenState?: boolean;
  subfoldersCount?: number;
  onClick: () => void;
}

function TactileFolderCard({
  folder,
  isActive,
  isOpenState = false,
  subfoldersCount = 0,
  onClick,
}: TactileFolderProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  // Folder shows peeking sheets if it's marked open, or when hovered
  const showSheets = isOpenState || isHovered;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative flex flex-col p-4 rounded-[20px] transition-all duration-200 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 border",
        isActive
          ? "bg-[#ECEAE4] border-[#DDD9CE] shadow-2xs"
          : "hover:bg-[#F2F1EC] bg-transparent border-transparent hover:border-[#E8E6DF]"
      )}
    >
      {/* Folder Graphic Illustration Container */}
      <div className="relative w-full aspect-[16/11] max-h-[145px] flex items-end justify-center overflow-visible">
        {/* Layer 1: Back Flap (Matte slate shape with top-left tab) */}
        <div className="absolute inset-x-2 bottom-0 top-3 bg-[#5C5F69] rounded-2xl shadow-xs overflow-visible">
          {/* Top Left Tab geometry */}
          <div className="absolute top-0 left-0 w-[42%] h-4 bg-[#5C5F69] -translate-y-3 rounded-t-[10px]" />
          <div className="absolute top-0 left-[40%] w-3 h-3 bg-transparent rounded-bl-lg shadow-[-3px_3px_0_0_#5C5F69] -translate-y-2 pointer-events-none" />
        </div>

        {/* Layer 2: White Peeking Document Sheets (Animates upward on hover) */}
        <div className="absolute inset-x-4 bottom-2 top-0 flex items-end justify-center pointer-events-none overflow-visible">
          {/* Left Sheet (tilted left) */}
          <motion.div
            animate={{
              y: showSheets ? (isHovered ? -16 : -5) : 24,
              rotate: isHovered ? -6 : -3,
              opacity: showSheets ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 420, damping: 25 }}
            className="absolute bottom-3 w-[66%] h-[78%] bg-[#F8F7F3] rounded-t-lg border border-[#DFDCD4] shadow-2xs flex flex-col pt-2 px-2 gap-1 -translate-x-3 origin-bottom-center"
          >
            <div className="w-10 h-1 bg-[#D6D4CC] rounded-full" />
            <div className="w-7 h-1 bg-[#E4E2DA] rounded-full" />
          </motion.div>

          {/* Right Sheet (tilted right) */}
          <motion.div
            animate={{
              y: showSheets ? (isHovered ? -14 : -4) : 24,
              rotate: isHovered ? 5 : 2.5,
              opacity: showSheets ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 400, damping: 24 }}
            className="absolute bottom-3 w-[64%] h-[76%] bg-[#FAF9F5] rounded-t-lg border border-[#DFDCD4] shadow-2xs flex flex-col pt-2 px-2 gap-1 translate-x-3 origin-bottom-center"
          >
            <div className="w-8 h-1 bg-[#D6D4CC] rounded-full" />
            <div className="w-12 h-1 bg-[#E4E2DA] rounded-full" />
          </motion.div>

          {/* Center Main Sheet (clean white, taller, folded corner / PDF badge) */}
          <motion.div
            animate={{
              y: showSheets ? (isHovered ? -22 : -10) : 24,
              scale: isHovered ? 1.02 : 1,
              opacity: showSheets ? 1 : 0,
            }}
            transition={{ type: "spring", stiffness: 440, damping: 26 }}
            className="relative bottom-3 w-[72%] h-[84%] bg-white rounded-t-lg border border-[#E8E6DF] shadow-md flex flex-col pt-2.5 px-2.5 gap-1.5 origin-bottom-center z-10"
          >
            <div className="flex items-center justify-between">
              <div className="w-9 h-1.5 bg-[#C5C3BA] rounded-full" />
              {/* Micro PDF pill badge matching reference */}
              <span className="bg-[#18181B] text-white text-[7px] font-bold px-1 py-0.2 rounded-2xs leading-none uppercase tracking-tight">
                PDF
              </span>
            </div>
            <div className="w-14 h-1 bg-[#D8D6CE] rounded-full mt-0.5" />
            <div className="w-11 h-1 bg-[#E2E0D8] rounded-full" />
            <div className="w-8 h-1 bg-[#EAE8E1] rounded-full" />
          </motion.div>
        </div>

        {/* Layer 3: Front Pocket / Flap (Matte slate pocket with smooth curved top) */}
        <div className="relative z-20 w-full h-[64%] bg-gradient-to-b from-[#5C5F69] to-[#51545E] rounded-b-2xl rounded-t-xl shadow-md border-t border-white/20 flex items-end p-3 justify-between">
          {/* Micro Brand Badges Stack on bottom-left */}
          <div className="flex -space-x-1.5 items-center">
            {folder.brandIcons.map((brand, idx) => (
              <div
                key={`${brand}-${idx}`}
                className="w-[21px] h-[21px] rounded-full bg-white ring-2 ring-[#51545E] flex items-center justify-center p-0.5 shadow-2xs shrink-0 overflow-hidden"
              >
                {brand === "pdf" ? (
                  <AdobePdfIcon size={14} />
                ) : brand === "xlsx" ? (
                  <MicrosoftExcelIcon size={14} />
                ) : brand === "docx" ? (
                  <MicrosoftWordIcon size={14} />
                ) : brand === "pptx" ? (
                  <MicrosoftPowerPointIcon size={14} />
                ) : (
                  <BrandFileBadge type={brand} size={14} />
                )}
              </div>
            ))}
          </div>

          {/* Micro file count indicator on bottom right */}
          <span className="text-[10.5px] font-medium text-white/60 tracking-tight tabular-nums">
            {folder.fileCount}
          </span>
        </div>
      </div>

      {/* Folder Meta Labels */}
      <div className="mt-3.5 space-y-1">
        <div className="flex items-start justify-between gap-1.5">
          <h3 className="text-[14.5px] font-semibold text-[#18181B] group-hover:text-black leading-snug line-clamp-1">
            {folder.name}
          </h3>
        </div>

        {/* Breakdown of subfolders & files for maximum clarity */}
        <div className="flex items-center gap-1.5 text-[12px] text-[#78756E] tabular-nums font-normal">
          {subfoldersCount > 0 ? (
            <>
              <span>{subfoldersCount} {subfoldersCount === 1 ? "subcarpeta" : "subcarpetas"}</span>
              <span>•</span>
            </>
          ) : null}
          <span>{folder.fileCount} {folder.fileCount === 1 ? "archivo" : "archivos"}</span>
        </div>

        {/* Primary tag pill */}
        {folder.tags?.[0] && (
          <div className="pt-0.5">
            <span className="inline-flex items-center text-[10px] font-medium text-[#52504A] bg-[#EAE8E1]/80 px-1.5 py-0.5 rounded-md">
              {folder.tags[0]}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main Institutional Files Viewport Component
// ============================================================================
export function InstitutionalFilesView() {
  const { myProfile } = useProfileStore();

  const [folders, setFolders] = React.useState<InstitutionalFolder[]>(INITIAL_FOLDERS);
  const [files, setFiles] = React.useState<InstitutionalFile[]>(INITIAL_FILES);
  const [activeFolderId, setActiveFolderId] = React.useState<string>("f-general");
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const [treeTab, setTreeTab] = React.useState<"folders" | "tags">("folders");
  const [searchTreeQuery, setSearchTreeQuery] = React.useState("");
  const [fileFilterQuery, setFileFilterQuery] = React.useState("");
  const [activeTag, setActiveTag] = React.useState<string | null>(null);
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid");
  const [rootDropdownOpen, setRootDropdownOpen] = React.useState(false);

  // Close dropdown on outside click
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setRootDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Expanded folders in the left tree
  const [expandedFolderIds, setExpandedFolderIds] = React.useState<Set<string>>(
    new Set(["f-general", "f-circulares", "f-comites"])
  );

  // New folder modal
  const [newFolderModalOpen, setNewFolderModalOpen] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState("");
  const [newFolderDesc, setNewFolderDesc] = React.useState("");

  // Preview file modal
  const [previewFile, setPreviewFile] = React.useState<InstitutionalFile | null>(null);

  // Real file upload ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [isDraggingOver, setIsDraggingOver] = React.useState(false);

  // Root folders (top-level departments)
  const rootFolders = React.useMemo(() => {
    return folders.filter((f) => !f.parentId);
  }, [folders]);

  // Find active folder
  const currentFolder = React.useMemo(() => {
    return (
      folders.find((f) => f.id === activeFolderId) ||
      folders[0] || {
        id: "f-root",
        name: "General Institucional",
        fileCount: 0,
        brandIcons: ["pdf"],
        tags: [],
      }
    );
  }, [folders, activeFolderId]);

  // Parent folder (for easy "Go up one level" button)
  const parentFolder = React.useMemo(() => {
    if (!currentFolder.parentId) return null;
    return folders.find((f) => f.id === currentFolder.parentId) || null;
  }, [currentFolder, folders]);

  // Breadcrumbs path
  const breadcrumbPath = React.useMemo(() => {
    const path: InstitutionalFolder[] = [];
    let curr: InstitutionalFolder | undefined = currentFolder;
    while (curr) {
      path.unshift(curr);
      if (curr.parentId) {
        curr = folders.find((f) => f.id === curr?.parentId);
      } else {
        break;
      }
    }
    return path;
  }, [currentFolder, folders]);

  // Subfolders of the active folder
  const currentSubfolders = React.useMemo(() => {
    return folders.filter((f) => f.parentId === activeFolderId);
  }, [folders, activeFolderId]);

  // Files belonging to the active folder (or matching tag filter)
  const currentFiles = React.useMemo(() => {
    let list = files;
    if (activeTag) {
      list = list.filter((f) => f.tags.includes(activeTag));
    } else {
      list = list.filter((f) => f.folderId === activeFolderId);
    }
    if (fileFilterQuery.trim()) {
      const q = fileFilterQuery.toLowerCase();
      list = list.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.addedBy.name.toLowerCase().includes(q) ||
          f.addedBy.email.toLowerCase().includes(q)
      );
    }
    return list;
  }, [files, activeFolderId, activeTag, fileFilterQuery]);

  // All unique tags with counts
  const allTagsWithCounts = React.useMemo(() => {
    const map = new Map<string, number>();
    files.forEach((f) => {
      f.tags.forEach((t) => {
        map.set(t, (map.get(t) || 0) + 1);
      });
    });
    return Array.from(map.entries()).map(([tag, count]) => ({ tag, count }));
  }, [files]);

  // Toggle tree folder collapse
  const toggleTreeFolder = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setExpandedFolderIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Handle uploading real files
  const handleUploadFiles = (uploadedFiles: FileList | null) => {
    if (!uploadedFiles || uploadedFiles.length === 0) return;

    const newEntries: InstitutionalFile[] = Array.from(uploadedFiles).map(
      (file, i) => {
        const ext = file.name.split(".").pop()?.toLowerCase();
        let extension: InstitutionalFile["extension"] = "file";
        if (ext === "pdf") extension = "pdf";
        else if (["xlsx", "xls", "csv"].includes(ext || "")) extension = "xlsx";
        else if (["docx", "doc"].includes(ext || "")) extension = "docx";
        else if (["pptx", "ppt"].includes(ext || "")) extension = "pptx";
        else if (["png", "jpg", "jpeg", "webp"].includes(ext || ""))
          extension = "image";

        const sizeKb = Math.round(file.size / 1024);
        const sizeFormatted =
          sizeKb > 1024
            ? `${(sizeKb / 1024).toFixed(1)} MB`
            : `${sizeKb} KB`;

        return {
          id: `file-upload-${Date.now()}-${i}`,
          name: file.name,
          extension,
          size: sizeFormatted,
          sizeBytes: file.size,
          folderId: activeFolderId,
          addedBy: {
            name: myProfile.name,
            email: ME_EMAIL,
            avatarSeed: "mariana-solis-directora",
            role: myProfile.role,
          },
          updatedAt: "Hace un momento",
          tags: ["Subido recientemente", "Institucional"],
          mepOfficial: false,
        };
      }
    );

    setFiles((prev) => [...newEntries, ...prev]);

    // Update folder file count
    setFolders((prev) =>
      prev.map((f) =>
        f.id === activeFolderId
          ? { ...f, fileCount: f.fileCount + newEntries.length }
          : f
      )
    );
  };

  // Handle create new folder
  const handleCreateFolder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    const newId = `f-${Date.now()}`;
    const newFolder: InstitutionalFolder = {
      id: newId,
      name: newFolderName.trim(),
      description: newFolderDesc.trim() || undefined,
      parentId: activeFolderId,
      fileCount: 0,
      brandIcons: ["pdf", "docx"],
      tags: ["Nueva", "Institucional"],
    };

    setFolders((prev) => [...prev, newFolder]);
    setExpandedFolderIds((prev) => new Set(prev).add(activeFolderId));
    setActiveFolderId(newId);
    setNewFolderName("");
    setNewFolderDesc("");
    setNewFolderModalOpen(false);
  };

  // Delete file
  const handleDeleteFile = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFiles((prev) => prev.filter((f) => f.id !== id));
    setFolders((prev) =>
      prev.map((f) =>
        f.id === activeFolderId
          ? { ...f, fileCount: Math.max(0, f.fileCount - 1) }
          : f
      )
    );
  };

  return (
    <div className="flex-1 flex w-full h-[calc(100vh-64px)] overflow-hidden bg-white">
      {/* Hidden File Picker Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => {
          handleUploadFiles(e.target.files);
          e.target.value = "";
        }}
      />

      {/* ==================================================================== */}
      {/* LEFT SIDEBAR: Knowledge Base / Archivo Institucional Tree */}
      {/* ==================================================================== */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.aside
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 280, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-[280px] shrink-0 border-r border-[#ECEBE7] bg-[#FAF9F6] flex flex-col overflow-hidden select-none"
          >
            {/* Header: Title + Actions */}
            <div className="px-4 py-3.5 flex items-center justify-between gap-2 border-b border-[#ECEBE7]">
              <div>
                <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-[#18181B] block">
                  Knowledge Base
                </span>
                <span className="text-[11px] text-[#78756E] block font-normal">
                  Estructura Institucional
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  title="Nueva Carpeta"
                  onClick={() => setNewFolderModalOpen(true)}
                  className="w-7 h-7 rounded-lg hover:bg-[#EAE8E2] text-[#52504A] hover:text-[#18181B] flex items-center justify-center transition-colors"
                >
                  <Plus weight="bold" className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  title="Ocultar panel lateral"
                  onClick={() => setSidebarOpen(false)}
                  className="w-7 h-7 rounded-lg hover:bg-[#EAE8E2] text-[#78756E] hover:text-[#18181B] flex items-center justify-center transition-colors"
                >
                  <SidebarSimple weight="regular" className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="px-3 pt-3 pb-2">
              <div className="relative">
                <MagnifyingGlass
                  weight="regular"
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9C9A94]"
                />
                <input
                  type="text"
                  placeholder="Buscar carpeta..."
                  value={searchTreeQuery}
                  onChange={(e) => setSearchTreeQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-[12.5px] bg-[#EFECE5] rounded-xl border-none outline-none focus:ring-1 focus:ring-zinc-900 text-[#18181B] placeholder-[#9C9A94] transition-all"
                />
              </div>
            </div>

            {/* Segmented Control: Folders | Tags */}
            <div className="px-3 pb-3">
              <div className="grid grid-cols-2 p-0.5 bg-[#EAE8E1] rounded-xl text-[12px] font-medium">
                <button
                  type="button"
                  onClick={() => {
                    setTreeTab("folders");
                    setActiveTag(null);
                  }}
                  className={cn(
                    "py-1 rounded-lg text-center transition-all",
                    treeTab === "folders"
                      ? "bg-white text-[#18181B] shadow-2xs font-semibold"
                      : "text-[#78756E] hover:text-[#18181B]"
                  )}
                >
                  Folders
                </button>
                <button
                  type="button"
                  onClick={() => setTreeTab("tags")}
                  className={cn(
                    "py-1 rounded-lg text-center transition-all",
                    treeTab === "tags"
                      ? "bg-white text-[#18181B] shadow-2xs font-semibold"
                      : "text-[#78756E] hover:text-[#18181B]"
                  )}
                >
                  Tags
                </button>
              </div>
            </div>

            {/* Tree Navigation Content */}
            <div className="flex-1 overflow-y-auto px-2 pb-4 space-y-0.5 custom-scrollbar">
              {treeTab === "folders" ? (
                <div>
                  {rootFolders
                    .filter((f) =>
                      searchTreeQuery
                        ? f.name
                            .toLowerCase()
                            .includes(searchTreeQuery.toLowerCase())
                        : true
                    )
                    .map((rf) => (
                      <TreeFolderItem
                        key={rf.id}
                        folder={rf}
                        allFolders={folders}
                        activeFolderId={activeFolderId}
                        expandedFolderIds={expandedFolderIds}
                        onSelectFolder={(id) => {
                          setActiveFolderId(id);
                          setActiveTag(null);
                        }}
                        onToggleCollapse={toggleTreeFolder}
                      />
                    ))}
                </div>
              ) : (
                /* Tags List */
                <div className="space-y-1 pt-1">
                  {allTagsWithCounts
                    .filter((t) =>
                      searchTreeQuery
                        ? t.tag
                            .toLowerCase()
                            .includes(searchTreeQuery.toLowerCase())
                        : true
                    )
                    .map(({ tag, count }) => {
                      const isTagActive = activeTag === tag;
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            setActiveTag(isTagActive ? null : tag);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-[12.5px] transition-colors",
                            isTagActive
                              ? "bg-[#18181B] text-white font-medium"
                              : "text-[#4A4843] hover:bg-[#ECE9E1]"
                          )}
                        >
                          <div className="flex items-center gap-2 truncate">
                            <Tag
                              weight={isTagActive ? "fill" : "regular"}
                              className={cn(
                                "w-3.5 h-3.5 shrink-0",
                                isTagActive ? "text-white" : "text-[#78756E]"
                              )}
                            />
                            <span className="truncate">{tag}</span>
                          </div>
                          <span
                            className={cn(
                              "text-[11px] px-1.5 py-0.2 rounded-md tabular-nums font-mono",
                              isTagActive
                                ? "bg-white/20 text-white"
                                : "bg-[#ECE9E1] text-[#78756E]"
                            )}
                          >
                            {count}
                          </span>
                        </button>
                      );
                    })}
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MAIN VIEWPORT */}
      {/* ==================================================================== */}
      <div
        className={cn(
          "flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-white transition-all",
          isDraggingOver && "ring-2 ring-inset ring-zinc-900 bg-[#FAF9F6]"
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggingOver(true);
        }}
        onDragLeave={() => setIsDraggingOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggingOver(false);
          handleUploadFiles(e.dataTransfer.files);
        }}
      >
        {/* Top Header / Breadcrumb Bar (Matching General Knowledge v) */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-8 py-3.5 border-b border-[#ECEBE7] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                type="button"
                title="Mostrar panel lateral"
                onClick={() => setSidebarOpen(true)}
                className="w-8 h-8 rounded-xl hover:bg-[#F4F3EE] text-[#52504A] hover:text-[#18181B] flex items-center justify-center transition-colors mr-1"
              >
                <SidebarSimple weight="regular" className="w-4 h-4" />
              </button>
            )}

            {/* Back button if inside a nested subfolder */}
            {parentFolder && (
              <button
                type="button"
                title={`Subir a ${parentFolder.name}`}
                onClick={() => {
                  setActiveFolderId(parentFolder.id);
                  setActiveTag(null);
                }}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[12px] font-medium text-[#52504A] hover:text-[#18181B] bg-[#F4F3EE] hover:bg-[#EAE8E1] transition-colors"
              >
                <ArrowBendUpLeft weight="bold" className="w-3.5 h-3.5" />
                <span>Volver</span>
              </button>
            )}

            {/* Root Selector Dropdown / Breadcrumb Hierarchy Navigation */}
            <div className="relative" ref={dropdownRef}>
              <div className="flex items-center gap-1.5 text-[15px] font-semibold text-[#18181B]">
                {breadcrumbPath.map((folder, index) => {
                  const isLast = index === breadcrumbPath.length - 1;
                  const isRoot = index === 0;

                  return (
                    <React.Fragment key={folder.id}>
                      {index > 0 && (
                        <CaretRight
                          weight="bold"
                          className="w-3.5 h-3.5 text-[#9C9A94] shrink-0"
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          if (isRoot && breadcrumbPath.length === 1) {
                            setRootDropdownOpen((prev) => !prev);
                          } else {
                            setActiveFolderId(folder.id);
                            setActiveTag(null);
                          }
                        }}
                        className={cn(
                          "flex items-center gap-1 hover:text-black transition-colors rounded-lg px-1.5 py-0.5",
                          isLast ? "text-[#18181B] font-semibold" : "text-[#78756E]"
                        )}
                      >
                        <span>{folder.name}</span>
                        {isRoot && (
                          <CaretDown
                            weight="bold"
                            className={cn(
                              "w-3 h-3 text-[#78756E] ml-0.5 transition-transform",
                              rootDropdownOpen && "rotate-180"
                            )}
                          />
                        )}
                      </button>
                    </React.Fragment>
                  );
                })}

                {activeTag && (
                  <div className="flex items-center gap-1.5 bg-[#18181B] text-white text-[12px] px-2.5 py-0.5 rounded-lg ml-2 font-normal">
                    <Tag weight="fill" className="w-3 h-3" />
                    <span>{activeTag}</span>
                    <button
                      type="button"
                      onClick={() => setActiveTag(null)}
                      className="hover:text-red-300 ml-1"
                    >
                      <X weight="bold" className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Root Department Switcher Popover */}
              <AnimatePresence>
                {rootDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.98 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#ECEBE7] py-2 z-30"
                  >
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-[#78756E] uppercase tracking-wider">
                      Departamentos y Áreas
                    </div>
                    {rootFolders.map((rf) => {
                      const isSelected = rf.id === activeFolderId;
                      return (
                        <button
                          key={rf.id}
                          type="button"
                          onClick={() => {
                            setActiveFolderId(rf.id);
                            setActiveTag(null);
                            setRootDropdownOpen(false);
                          }}
                          className={cn(
                            "w-full px-3.5 py-2 text-left flex items-center justify-between text-[13px] transition-colors",
                            isSelected
                              ? "bg-[#FAF9F6] text-[#18181B] font-semibold"
                              : "text-[#4A4843] hover:bg-[#F4F3EE] hover:text-[#18181B]"
                          )}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <Folder
                              weight={isSelected ? "fill" : "regular"}
                              className={cn(
                                "w-4 h-4 shrink-0",
                                isSelected ? "text-[#18181B]" : "text-[#78756E]"
                              )}
                            />
                            <span className="truncate">{rf.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#78756E] tabular-nums font-mono">
                              {rf.fileCount}
                            </span>
                            {isSelected && (
                              <Check weight="bold" className="w-3.5 h-3.5 text-[#18181B]" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle: Grid vs List */}
            <div className="bg-[#F3F2EE] p-0.5 rounded-xl border border-[#E8E7E2] hidden sm:flex items-center">
              <button
                type="button"
                title="Vista Cuadrícula"
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg text-[#78756E] transition-all",
                  viewMode === "grid"
                    ? "bg-white text-[#18181B] shadow-2xs"
                    : "hover:text-[#18181B]"
                )}
              >
                <SquaresFour weight={viewMode === "grid" ? "fill" : "regular"} className="w-4 h-4" />
              </button>
              <button
                type="button"
                title="Vista Lista"
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded-lg text-[#78756E] transition-all",
                  viewMode === "list"
                    ? "bg-white text-[#18181B] shadow-2xs"
                    : "hover:text-[#18181B]"
                )}
              >
                <ListBullets weight={viewMode === "list" ? "bold" : "regular"} className="w-4 h-4" />
              </button>
            </div>

            {/* Search inside active directory */}
            <div className="relative hidden md:block">
              <MagnifyingGlass
                weight="regular"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#9C9A94]"
              />
              <input
                type="text"
                placeholder="Filtrar archivos..."
                value={fileFilterQuery}
                onChange={(e) => setFileFilterQuery(e.target.value)}
                className="w-44 pl-8 pr-3 py-1.5 text-[12.5px] bg-[#FAF9F6] border border-[#ECEBE7] rounded-xl outline-none focus:ring-1 focus:ring-zinc-900 text-[#18181B] placeholder-[#9C9A94] transition-all"
              />
            </div>

            <button
              type="button"
              onClick={() => setNewFolderModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#ECEBE7] bg-[#FAF9F6] hover:bg-[#F3F2ED] text-[12.5px] font-medium text-[#18181B] transition-colors"
            >
              <Plus weight="bold" className="w-3.5 h-3.5" />
              <span>Nueva Carpeta</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#18181B] hover:bg-black text-[12.5px] font-medium text-white shadow-xs transition-colors"
            >
              <UploadSimple weight="bold" className="w-3.5 h-3.5" />
              <span>Subir Archivo</span>
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="p-8 sm:p-10 space-y-10 max-w-7xl">
          {/* Active Folder Context Bar (Explaining current location & purpose) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-1 border-b border-[#F0EEEA]">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[12px] font-semibold text-[#78756E] uppercase tracking-wider">
                  Ubicación actual
                </span>
                <span className="text-[#C5C3BA]">•</span>
                <span className="text-[12px] text-[#78756E]">
                  {currentSubfolders.length} {currentSubfolders.length === 1 ? "subcarpeta" : "subcarpetas"}
                  {", "}
                  {currentFiles.length} {currentFiles.length === 1 ? "archivo directo" : "archivos directos"}
                </span>
              </div>
              {currentFolder.description && (
                <p className="text-[13px] text-[#52504A] mt-0.5">
                  {currentFolder.description}
                </p>
              )}
            </div>
          </div>

          {/* ================================================================ */}
          {/* SECTION 1: Folders Grid / List (Matching exact reference design) */}
          {/* ================================================================ */}
          {currentSubfolders.length > 0 && !activeTag && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-[18px] font-semibold text-[#18181B] tracking-[-0.015em]">
                    Folders
                  </h2>
                  <span className="text-[12px] text-[#78756E] font-mono tabular-nums">
                    ({currentSubfolders.length})
                  </span>
                </div>
              </div>

              {viewMode === "grid" ? (
                /* Grid of Tactile Physical Folders */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
                  {currentSubfolders.map((folder, index) => {
                    const childCount = folders.filter((f) => f.parentId === folder.id).length;
                    return (
                      <TactileFolderCard
                        key={folder.id}
                        folder={folder}
                        isActive={folder.id === activeFolderId}
                        isOpenState={index === 0}
                        subfoldersCount={childCount}
                        onClick={() => setActiveFolderId(folder.id)}
                      />
                    );
                  })}
                </div>
              ) : (
                /* List View of Subfolders for enhanced structural visibility */
                <div className="border border-[#ECEBE7] rounded-2xl overflow-hidden shadow-2xs bg-white">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#ECEBE7] bg-[#FAF9F6] text-[12.5px] font-medium text-[#78756E]">
                        <th className="py-3 px-5">Nombre de Carpeta</th>
                        <th className="py-3 px-5 hidden sm:table-cell">Descripción</th>
                        <th className="py-3 px-5 hidden md:table-cell">Estructura</th>
                        <th className="py-3 px-5 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ECEBE7] text-[13px]">
                      {currentSubfolders.map((folder) => {
                        const childCount = folders.filter((f) => f.parentId === folder.id).length;
                        return (
                          <tr
                            key={folder.id}
                            onClick={() => setActiveFolderId(folder.id)}
                            className="hover:bg-[#FAF9F6] transition-colors group cursor-pointer"
                          >
                            <td className="py-3 px-5">
                              <div className="flex items-center gap-2.5 font-medium text-[#18181B] group-hover:underline">
                                <Folder weight="fill" className="w-4 h-4 text-[#5C5F69]" />
                                <span>{folder.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-5 text-[#78756E] text-[12.5px] hidden sm:table-cell">
                              {folder.description || "Sin descripción"}
                            </td>
                            <td className="py-3 px-5 text-[#78756E] text-[12px] hidden md:table-cell">
                              {childCount > 0 && `${childCount} subcarpetas • `}
                              {folder.fileCount} archivos
                            </td>
                            <td className="py-3 px-5 text-right">
                              <span className="text-[12px] font-medium text-[#18181B] group-hover:translate-x-0.5 inline-block transition-transform">
                                Abrir →
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {/* ================================================================ */}
          {/* SECTION 2: Files Table (Matching exact reference design) */}
          {/* ================================================================ */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-[18px] font-semibold text-[#18181B] tracking-[-0.015em]">
                  Files
                </h2>
                <span className="text-[12px] text-[#78756E] font-mono tabular-nums">
                  ({currentFiles.length})
                </span>
              </div>
            </div>

            {currentFiles.length === 0 ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-[#E5E4DF] hover:border-zinc-400 bg-[#FAF9F6] rounded-2xl p-12 flex flex-col items-center justify-center text-center cursor-pointer transition-colors"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#E5E4DF] flex items-center justify-center text-[#78756E] mb-3 shadow-2xs">
                  <UploadSimple weight="regular" className="w-6 h-6" />
                </div>
                <h3 className="text-[14px] font-semibold text-[#18181B] mb-1">
                  Esta carpeta no tiene archivos directos
                </h3>
                <p className="text-[12.5px] text-[#78756E] max-w-sm">
                  Haz clic aquí o arrastra archivos para subirlos a{" "}
                  <span className="font-semibold text-[#18181B]">
                    {currentFolder.name}
                  </span>
                  .
                </p>
              </div>
            ) : (
              <div className="border border-[#ECEBE7] rounded-2xl overflow-hidden shadow-2xs bg-white">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#ECEBE7] bg-[#FAF9F6] text-[12.5px] font-medium text-[#78756E]">
                        <th className="py-3 px-5 font-medium">Name</th>
                        <th className="py-3 px-5 font-medium hidden sm:table-cell">
                          Added By
                        </th>
                        <th className="py-3 px-5 font-medium hidden md:table-cell">
                          Fecha
                        </th>
                        <th className="py-3 px-5 font-medium hidden lg:table-cell">
                          Tamaño
                        </th>
                        <th className="py-3 px-5 font-medium text-right">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#ECEBE7] text-[13px]">
                      {currentFiles.map((file) => (
                        <tr
                          key={file.id}
                          onClick={() => setPreviewFile(file)}
                          className="hover:bg-[#FAF9F6] transition-colors group cursor-pointer"
                        >
                          {/* File Name + Clean Brand Icon (NO wrapping container box!) */}
                          <td className="py-3.5 px-5">
                            <div className="flex items-center gap-3">
                              <BrandFileBadge
                                type={file.extension}
                                name={file.name}
                                size={20}
                                className="shrink-0"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium text-[#18181B] group-hover:underline truncate">
                                    {file.name}
                                  </span>
                                  {file.mepOfficial && (
                                    <span className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#1D4ED8] text-[10px] font-semibold px-1.5 py-0.5 rounded-md shrink-0">
                                      <ShieldCheck
                                        weight="fill"
                                        className="w-3 h-3"
                                      />
                                      MEP Oficial
                                    </span>
                                  )}
                                </div>
                                <div className="flex sm:hidden items-center gap-2 text-[11px] text-[#78756E] mt-0.5">
                                  <span>{file.size}</span>
                                  <span>•</span>
                                  <span>{file.updatedAt}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Added By: Avatar + Email */}
                          <td className="py-3.5 px-5 hidden sm:table-cell">
                            <div className="flex items-center gap-2.5">
                              <NexusAvatar
                                seed={file.addedBy.avatarSeed}
                                size={22}
                                className="ring-1 ring-[#ECEBE7]"
                              />
                              <div className="truncate text-[12.5px] text-[#78756E]">
                                {file.addedBy.email}
                              </div>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="py-3.5 px-5 hidden md:table-cell text-[#78756E] text-[12.5px] whitespace-nowrap">
                            {file.updatedAt}
                          </td>

                          {/* Size */}
                          <td className="py-3.5 px-5 hidden lg:table-cell text-[#78756E] text-[12.5px] font-mono tabular-nums whitespace-nowrap">
                            {file.size}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-5 text-right">
                            <div
                              className="inline-flex items-center gap-1"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                title="Vista Previa"
                                onClick={() => setPreviewFile(file)}
                                className="w-7 h-7 rounded-lg hover:bg-[#EAE8E2] text-[#52504A] hover:text-[#18181B] flex items-center justify-center transition-colors"
                              >
                                <Eye weight="regular" className="w-4 h-4" />
                              </button>
                              <a
                                href={`#download-${file.id}`}
                                download={file.name}
                                title="Descargar"
                                onClick={(e) => {
                                  e.preventDefault();
                                  const blob = new Blob(
                                    [
                                      `Nexus Academic System\nArchivo Institucional: ${file.name}\nSubido por: ${file.addedBy.name}`,
                                    ],
                                    { type: "text/plain;charset=utf-8" }
                                  );
                                  const url = URL.createObjectURL(blob);
                                  const a = document.createElement("a");
                                  a.href = url;
                                  a.download = file.name;
                                  a.click();
                                  URL.revokeObjectURL(url);
                                }}
                                className="w-7 h-7 rounded-lg hover:bg-[#EAE8E2] text-[#52504A] hover:text-[#18181B] flex items-center justify-center transition-colors"
                              >
                                <DownloadSimple
                                  weight="regular"
                                  className="w-4 h-4"
                                />
                              </a>
                              <button
                                type="button"
                                title="Eliminar"
                                onClick={(e) => handleDeleteFile(file.id, e)}
                                className="w-7 h-7 rounded-lg hover:bg-red-50 text-[#78756E] hover:text-red-600 flex items-center justify-center transition-colors"
                              >
                                <Trash weight="regular" className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODAL: Nueva Carpeta */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {newFolderModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 backdrop-blur-xs flex items-center justify-center p-4"
            onClick={() => setNewFolderModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-[#ECEBE7] p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-[#F4F3EE] flex items-center justify-center text-[#18181B]">
                    <Folder weight="fill" className="w-5 h-5 text-[#5C5F69]" />
                  </div>
                  <div>
                    <h3 className="text-[15px] font-semibold text-[#18181B]">
                      Nueva Carpeta
                    </h3>
                    <p className="text-[12px] text-[#78756E]">
                      En {currentFolder.name}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setNewFolderModalOpen(false)}
                  className="w-7 h-7 rounded-lg hover:bg-[#F4F3EE] text-[#78756E] hover:text-[#18181B] flex items-center justify-center"
                >
                  <X weight="bold" className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateFolder} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-[#18181B]">
                    Nombre de la carpeta
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder="Ej. Actas de Comité 2026"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] bg-[#FAF9F6] border border-[#ECEBE7] rounded-xl outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[12px] font-medium text-[#18181B]">
                    Descripción opcional
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Detalles sobre los documentos contenidos..."
                    value={newFolderDesc}
                    onChange={(e) => setNewFolderDesc(e.target.value)}
                    className="w-full px-3 py-2 text-[13px] bg-[#FAF9F6] border border-[#ECEBE7] rounded-xl outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setNewFolderModalOpen(false)}
                    className="px-3.5 py-1.5 text-[12.5px] font-medium text-[#78756E] hover:text-[#18181B] rounded-xl transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 text-[12.5px] font-semibold text-white bg-[#18181B] hover:bg-black rounded-xl shadow-xs transition-colors"
                  >
                    Crear Carpeta
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL: Vista Previa de Documento Oficial */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {previewFile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setPreviewFile(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#ECEBE7] overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Preview Header */}
              <div className="px-5 py-3.5 border-b border-[#ECEBE7] flex items-center justify-between gap-3 bg-[#FAF9F6]">
                <div className="flex items-center gap-3 truncate">
                  <BrandFileBadge
                    type={previewFile.extension}
                    name={previewFile.name}
                    size={24}
                  />
                  <div className="truncate">
                    <h3 className="text-[14px] font-semibold text-[#18181B] truncate">
                      {previewFile.name}
                    </h3>
                    <p className="text-[11.5px] text-[#78756E] tabular-nums">
                      {previewFile.size} • Subido por {previewFile.addedBy.name}{" "}
                      • {previewFile.updatedAt}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      const blob = new Blob(
                        [`Contenido simulado de ${previewFile.name}`],
                        { type: "text/plain;charset=utf-8" }
                      );
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = previewFile.name;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#ECEBE7] bg-white hover:bg-[#F3F2ED] text-[12px] font-medium text-[#18181B] transition-colors"
                  >
                    <DownloadSimple weight="bold" className="w-3.5 h-3.5" />
                    <span>Descargar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPreviewFile(null)}
                    className="w-7 h-7 rounded-lg hover:bg-[#EAE8E2] text-[#78756E] hover:text-[#18181B] flex items-center justify-center transition-colors"
                  >
                    <X weight="bold" className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Preview Body Simulator */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 bg-[#F4F3EF] flex justify-center custom-scrollbar">
                <div className="w-full max-w-2xl bg-white rounded-xl shadow-md border border-[#E5E4DF] p-8 sm:p-10 space-y-6 text-[#18181B]">
                  {/* Institutional Letterhead */}
                  <div className="border-b border-[#ECEBE7] pb-5 flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-[11px] font-bold tracking-wider text-[#78756E] uppercase">
                        Ministerio de Educación Pública • Costa Rica
                      </div>
                      <div className="text-[16px] font-bold text-[#18181B]">
                        {previewFile.mepOfficial
                          ? "Directriz Institucional Oficial"
                          : "Repositorio Digital NEXUS"}
                      </div>
                      <div className="text-[12px] text-[#78756E]">
                        Expediente Oficial • Ciclo Lectivo 2026
                      </div>
                    </div>
                    {previewFile.mepOfficial && (
                      <span className="inline-flex items-center gap-1 bg-[#EFF6FF] text-[#1D4ED8] text-[11px] font-semibold px-2 py-1 rounded-md">
                        <ShieldCheck weight="fill" className="w-3.5 h-3.5" />
                        Validado MEP
                      </span>
                    )}
                  </div>

                  {/* Document Simulated Body */}
                  {previewFile.extension === "xlsx" ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[13px] font-semibold text-[#18181B]">
                        <Table weight="regular" className="w-4 h-4 text-[#059669]" />
                        <span>Vista Preliminar de Hoja de Cálculo</span>
                      </div>
                      <div className="border border-[#ECEBE7] rounded-lg overflow-hidden text-[11.5px]">
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-[#FAF9F6] border-b border-[#ECEBE7] text-[#78756E]">
                              <th className="p-2 border-r border-[#ECEBE7]">#</th>
                              <th className="p-2 border-r border-[#ECEBE7]">Código Estudiante</th>
                              <th className="p-2 border-r border-[#ECEBE7]">Sección</th>
                              <th className="p-2 border-r border-[#ECEBE7]">Criterio Sumativo</th>
                              <th className="p-2">Calificación</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#ECEBE7]">
                            {[
                              { id: 1, code: "EXP-2026-081", sec: "10-2", crit: "Prueba Trimestral I", note: "94,5" },
                              { id: 2, code: "EXP-2026-094", sec: "10-2", crit: "Trabajo Cotidiano", note: "88,0" },
                              { id: 3, code: "EXP-2026-112", sec: "10-2", crit: "Tareas y Prácticas", note: "100,0" },
                              { id: 4, code: "EXP-2026-128", sec: "10-2", crit: "Asistencia Regular", note: "96,2" },
                            ].map((r) => (
                              <tr key={r.id}>
                                <td className="p-2 border-r border-[#ECEBE7] text-[#78756E] font-mono">{r.id}</td>
                                <td className="p-2 border-r border-[#ECEBE7] font-medium">{r.code}</td>
                                <td className="p-2 border-r border-[#ECEBE7]">{r.sec}</td>
                                <td className="p-2 border-r border-[#ECEBE7]">{r.crit}</td>
                                <td className="p-2 font-mono font-semibold text-[#059669]">{r.note}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 text-[13px] leading-relaxed text-[#35373E]">
                      <p className="font-semibold text-[#18181B]">
                        Asunto: {previewFile.name.replace(/\.[^/.]+$/, "")}
                      </p>
                      <p>
                        Por medio de la presente, la Dirección Institucional y el cuerpo docente
                        hacen constar el cumplimiento estricto de las disposiciones académicas,
                        administrativas y de convivencia escolar vigentes para el periodo en curso.
                      </p>
                      <p>
                        Los expedientes y registros consignados en este repositorio cuentan con
                        validez jurídica bajo los estándares de firma digital y resguardo institucional
                        de la plataforma NEXUS.
                      </p>

                      <div className="pt-6 border-t border-[#ECEBE7] flex items-center justify-between text-[11.5px] text-[#78756E]">
                        <div>
                          <div className="font-semibold text-[#18181B]">
                            {previewFile.addedBy.name}
                          </div>
                          <div>{previewFile.addedBy.role}</div>
                          <div>{previewFile.addedBy.email}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono text-[10px] text-[#9C9A94]">
                            HASH SHA-256: 4f8a9...b12
                          </div>
                          <div className="text-emerald-700 font-semibold mt-0.5">
                            FIRMADO DIGITALMENTE
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// Tree Folder Item Component (Recursive for subfolders with tree connector lines)
// ============================================================================
interface TreeFolderItemProps {
  folder: InstitutionalFolder;
  allFolders: InstitutionalFolder[];
  activeFolderId: string;
  expandedFolderIds: Set<string>;
  onSelectFolder: (id: string) => void;
  onToggleCollapse: (id: string, e?: React.MouseEvent) => void;
  level?: number;
}

function TreeFolderItem({
  folder,
  allFolders,
  activeFolderId,
  expandedFolderIds,
  onSelectFolder,
  onToggleCollapse,
  level = 0,
}: TreeFolderItemProps) {
  const isExpanded = expandedFolderIds.has(folder.id);
  const isActive = folder.id === activeFolderId;

  const childFolders = React.useMemo(() => {
    return allFolders.filter((f) => f.parentId === folder.id);
  }, [allFolders, folder.id]);

  const hasChildren = childFolders.length > 0;

  return (
    <div className="space-y-0.5">
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelectFolder(folder.id)}
        className={cn(
          "w-full flex items-center justify-between px-2.5 py-1.5 rounded-xl text-left text-[13px] transition-colors cursor-pointer group select-none",
          isActive
            ? "bg-[#EAE8E1] text-[#18181B] font-semibold"
            : "text-[#4A4843] hover:bg-[#F2F0E8] hover:text-[#18181B]"
        )}
      >
        <div className="flex items-center gap-2 truncate min-w-0">
          {hasChildren ? (
            <button
              type="button"
              onClick={(e) => onToggleCollapse(folder.id, e)}
              className="w-4 h-4 rounded hover:bg-[#DDDBCF] text-[#78756E] flex items-center justify-center shrink-0"
            >
              {isExpanded ? (
                <CaretDown weight="bold" className="w-3 h-3" />
              ) : (
                <CaretRight weight="bold" className="w-3 h-3" />
              )}
            </button>
          ) : (
            <span className="w-4 shrink-0" />
          )}

          {isActive || isExpanded ? (
            <FolderOpen
              weight="fill"
              className={cn(
                "w-4 h-4 shrink-0",
                isActive ? "text-[#18181B]" : "text-[#5C5F69]"
              )}
            />
          ) : (
            <Folder
              weight="regular"
              className="w-4 h-4 shrink-0 text-[#78756E]"
            />
          )}

          <span className="truncate">{folder.name}</span>
        </div>

        <span
          className={cn(
            "text-[11.5px] px-1.5 py-0.2 rounded-md tabular-nums font-mono shrink-0 ml-1.5",
            isActive
              ? "bg-white text-[#18181B] font-semibold shadow-2xs"
              : "bg-[#EAE8E1] text-[#78756E]"
          )}
        >
          {folder.fileCount}
        </span>
      </div>

      {/* Child Folders with connecting tree lines matching reference */}
      {hasChildren && isExpanded && (
        <div className="border-l border-[#DFDDD6] ml-4 pl-2 space-y-0.5">
          {childFolders.map((child) => (
            <TreeFolderItem
              key={child.id}
              folder={child}
              allFolders={allFolders}
              activeFolderId={activeFolderId}
              expandedFolderIds={expandedFolderIds}
              onSelectFolder={onSelectFolder}
              onToggleCollapse={onToggleCollapse}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
