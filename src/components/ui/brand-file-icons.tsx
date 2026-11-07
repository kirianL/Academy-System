"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Real brand logos sourced from svgl.app (https://svgl.app/docs/api),
 * stored locally in /public/brands. Rendered free, without any container box.
 */
const BRAND_SRC = {
  pdf: "/brands/acrobat-reader.svg",
  xlsx: "/brands/microsoft-excel.svg",
  pptx: "/brands/microsoft-powerpoint.svg",
  docx: "/brands/microsoft-word.svg",
} as const;

export type BrandKey = keyof typeof BRAND_SRC | "drive" | "notion";

function resolveKind(type?: string, name?: string): BrandKey | "image" | "file" {
  const ext = (type || name?.split(".").pop() || "").toLowerCase();
  if (ext === "xlsx" || ext === "xls" || ext === "csv" || ext === "excel" || ext === "sheets") return "xlsx";
  if (ext === "pptx" || ext === "ppt" || ext === "powerpoint" || ext === "slides") return "pptx";
  if (ext === "docx" || ext === "doc" || ext === "word" || ext === "docs") return "docx";
  if (ext === "drive" || ext === "gdrive") return "drive";
  if (ext === "notion") return "notion";
  if (["png", "jpg", "jpeg", "webp", "gif", "svg", "image"].includes(ext)) return "image";
  if (ext === "pdf") return "pdf";
  return "pdf";
}

interface BrandIconProps {
  className?: string;
  size?: number;
}

export function GoogleDriveIcon({ size = 20, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0 select-none object-contain", className)}
      style={{ width: size, height: size }}
    >
      <path d="M8.2 4.2L2.5 14.1L5.3 19L11 9.1L8.2 4.2Z" fill="#0066DA" />
      <path d="M15.8 4.2H8.2L11 9.1H21.5L18.7 4.2H15.8Z" fill="#00AC47" />
      <path d="M21.5 9.1L15.8 19H10.1L12.9 14.1H21.5L21.5 9.1Z" fill="#EA4335" />
      <path d="M15.8 19L18.7 14.1L13 4.2L10.1 9.1L15.8 19Z" fill="#FFBA00" />
    </svg>
  );
}

export function NotionIcon({ size = 20, className }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={cn("shrink-0 select-none object-contain", className)}
      style={{ width: size, height: size }}
    >
      <rect width="24" height="24" rx="4.5" fill="#000000" />
      <path
        d="M6 6.8C6.3 7.2 6.7 7.2 7.5 7.1L16.2 6.6C17 6.5 17.2 6.2 17.2 6.2L18.1 7.7V17.5C18.1 18.2 17.5 18.6 16.6 18.7L7.6 19.3C6.7 19.4 6.5 19 6.5 18.5V7.7C6.5 7.2 6.1 7 5.8 6.8L6 6.8Z"
        fill="white"
      />
      <path
        d="M8.2 8.8L14.4 8.5V16.8L8.2 17.1V8.8Z"
        fill="#000000"
      />
    </svg>
  );
}

function BrandImg({ k, size = 24, className }: BrandIconProps & { k: keyof typeof BRAND_SRC }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={BRAND_SRC[k]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      draggable={false}
      className={cn("shrink-0 select-none object-contain", className)}
      style={{ width: size, height: size }}
    />
  );
}

export const AdobePdfIcon = (p: BrandIconProps) => <BrandImg k="pdf" {...p} />;
export const MicrosoftExcelIcon = (p: BrandIconProps) => <BrandImg k="xlsx" {...p} />;
export const MicrosoftPowerPointIcon = (p: BrandIconProps) => <BrandImg k="pptx" {...p} />;
export const MicrosoftWordIcon = (p: BrandIconProps) => <BrandImg k="docx" {...p} />;

export function BrandFileBadge({
  type,
  name,
  className,
  size = 22,
}: {
  type?: string;
  name?: string;
  className?: string;
  size?: number;
}) {
  const kind = resolveKind(type, name);

  if (kind === "drive") {
    return <GoogleDriveIcon size={size} className={className} />;
  }

  if (kind === "notion") {
    return <NotionIcon size={size} className={className} />;
  }

  if (kind === "image") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-[#059669] shrink-0 select-none", className)}
        style={{ width: size, height: size }}
      >
        <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    );
  }

  if (kind === "file") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn("text-[#78756E] shrink-0 select-none", className)}
        style={{ width: size, height: size }}
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    );
  }

  return <BrandImg k={kind} size={size} className={className} />;
}
