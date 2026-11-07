"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ME_SEEDS,
  useProfileStore,
  type BannerThemeId,
  type BannerPatternId,
} from "@/lib/profile-store";

/** Deterministic hash → hue so each person gets a stable cover. */
function hashHue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h % 360;
}

const THEME_GRADIENTS: Record<
  Exclude<BannerThemeId, "auto">,
  { a: string; b: string; c: string; base: string; isDark?: boolean }
> = {
  sand: {
    a: "#E6E0D4",
    b: "#D5CCC0",
    c: "#F5F2EB",
    base: "#EAE6DD",
  },
  sage: {
    a: "#D4E8DF",
    b: "#B5D6C8",
    c: "#EDF6F2",
    base: "#E2EFE9",
  },
  amber: {
    a: "#FBE2BA",
    b: "#F0C28C",
    c: "#FDF3E3",
    base: "#F7E8D0",
  },
  slate: {
    a: "#D8E3F2",
    b: "#BACBE4",
    c: "#EEF3FA",
    base: "#E4ECF7",
  },
  terracotta: {
    a: "#F3D5CA",
    b: "#E2B2A1",
    c: "#FBF0EC",
    base: "#F5E1DA",
  },
  obsidian: {
    a: "#27272A",
    b: "#3F3F46",
    c: "#18181B",
    base: "#18181B",
    isDark: true,
  },
};

export function ProfileBanner({
  seed,
  imageUrl,
  theme: propTheme,
  pattern: propPattern,
  className,
}: {
  seed: string;
  imageUrl?: string;
  theme?: BannerThemeId;
  pattern?: BannerPatternId;
  className?: string;
}) {
  const { myProfile } = useProfileStore();
  const isMe = ME_SEEDS.has(seed);

  const effectiveImage =
    imageUrl ?? (isMe ? myProfile.bannerImage || "/images/inbox-ai-banner.png" : undefined);

  if (effectiveImage) {
    return (
      <div
        className={cn(
          "relative w-full overflow-hidden select-none bg-[#EDEBE6] rounded-t-[20px]",
          className
        )}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={effectiveImage}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/[0.08] to-transparent pointer-events-none"
        />
      </div>
    );
  }

  const effectiveTheme =
    propTheme ?? (isMe ? myProfile.bannerTheme : undefined) ?? "auto";
  const effectivePattern =
    propPattern ?? (isMe ? myProfile.bannerPattern : undefined) ?? "grid";

  const hue = hashHue(seed);
  const colors =
    effectiveTheme !== "auto" && THEME_GRADIENTS[effectiveTheme]
      ? THEME_GRADIENTS[effectiveTheme]
      : {
          a: `hsl(${hue} 62% 84%)`,
          b: `hsl(${(hue + 38) % 360} 56% 76%)`,
          c: `hsl(${(hue + 305) % 360} 50% 90%)`,
          base: "#EDEBE6",
          isDark: false,
        };

  const lineOverlay = colors.isDark
    ? "rgba(255,255,255,0.14)"
    : "rgba(255,255,255,0.65)";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none rounded-t-[20px]",
        className
      )}
      style={{
        backgroundColor: colors.base,
        backgroundImage: `radial-gradient(at 14% 22%, ${colors.a} 0px, transparent 58%),
          radial-gradient(at 86% 14%, ${colors.b} 0px, transparent 52%),
          radial-gradient(at 58% 96%, ${colors.c} 0px, transparent 58%),
          linear-gradient(135deg, ${colors.c}, ${colors.a})`,
      }}
    >
      {effectivePattern === "grid" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `linear-gradient(${lineOverlay} 1px, transparent 1px), linear-gradient(90deg, ${lineOverlay} 1px, transparent 1px)`,
            backgroundSize: "22px 22px",
          }}
        />
      )}

      {effectivePattern === "dots" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `radial-gradient(${
              colors.isDark ? "rgba(255,255,255,0.28)" : "rgba(24,24,27,0.15)"
            } 1.25px, transparent 1.25px)`,
            backgroundSize: "14px 14px",
          }}
        />
      )}

      {effectivePattern === "waves" && (
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: `repeating-linear-gradient(-28deg, ${lineOverlay}, ${lineOverlay} 1px, transparent 1px, transparent 14px)`,
          }}
        />
      )}

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/[0.04] to-transparent"
      />
    </div>
  );
}
