"use client";

import * as React from "react";
import { Avatar } from "@avatune/react";
import pacovqzz from "@avatune/pacovqzz-theme/react";
import { cn } from "@/lib/utils";
import { ME_SEEDS, useProfileStore, type AvatarOverrides } from "@/lib/profile-store";

export interface NexusAvatarProps {
  seed: string;
  size?: number;
  className?: string;
  verified?: boolean;
  border?: boolean;
  /** Explicit config override (used by the avatar editor preview) */
  config?: AvatarOverrides;
}

const SOLID_HAIR_STYLES = new Set(["short", "medium", "long", "curly", "mohawk"]);

/**
 * Avatar powered by @avatune/pacovqzz-theme with extended real-time customization
 * for hair color, eyewear tint, facial hair tone, facial details, and accessories.
 */
export function NexusAvatar({
  seed,
  size = 36,
  className,
  border = true,
  config,
}: NexusAvatarProps) {
  const [mounted, setMounted] = React.useState(false);
  const { myAvatar } = useProfileStore();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const overrides = config ?? (ME_SEEDS.has(seed) ? myAvatar : undefined);
  const effectiveSeed = ME_SEEDS.has(seed) ? "mariana-solis-directora" : seed;

  const {
    faceDetails,
    accessory,
    accessoryColor = "#D97706",
    eyesColor,
    mouthColor,
    ...avatuneProps
  } = overrides ?? {};

  const tintSolidHair =
    avatuneProps.hairColor &&
    (!avatuneProps.hair || SOLID_HAIR_STYLES.has(avatuneProps.hair));

  const customVars = {
    ...(tintSolidHair ? { "--av-hair": avatuneProps.hairColor } : {}),
    ...(eyesColor ? { "--av-eyes": eyesColor } : {}),
    ...(mouthColor ? { "--av-mouth": mouthColor } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative shrink-0 select-none inline-flex items-center justify-center rounded-full overflow-visible",
        className
      )}
      style={{ width: size, height: size }}
    >
      <div
        style={customVars}
        className={cn(
          "relative w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#FAF9F6] shadow-xs",
          border && "ring-1 ring-black/[0.08]",
          tintSolidHair &&
            "[&_g[data-testid^='avatar-item-hair']_path[fill='#000']]:fill-[var(--av-hair)]",
          eyesColor &&
            "[&_g[data-testid^='avatar-item-eyes']_path[fill='#000']]:fill-[var(--av-eyes)]",
          mouthColor &&
            "[&_g[data-testid^='avatar-item-mouth']_path[fill='#000']]:fill-[var(--av-mouth)]"
        )}
      >
        {mounted ? (
          <>
            <Avatar
              theme={pacovqzz}
              seed={effectiveSeed}
              size={size}
              className="w-full h-full object-cover"
              {...avatuneProps}
            />
            {(faceDetails && faceDetails !== "none") ||
            (accessory && accessory !== "none") ? (
              <svg
                viewBox="0 0 260 260"
                width={size}
                height={size}
                className="absolute inset-0 w-full h-full pointer-events-none"
                aria-hidden="true"
              >
                <g transform="translate(-31.2, 0)">
                  {/* Facial details in 320x320 head space */}
                  {faceDetails === "freckles" && (
                    <g fill="#8C5230" opacity="0.55">
                      <circle cx="136" cy="138" r="1.6" />
                      <circle cx="142" cy="140" r="1.4" />
                      <circle cx="139" cy="143" r="1.5" />
                      <circle cx="182" cy="140" r="1.4" />
                      <circle cx="188" cy="138" r="1.6" />
                      <circle cx="185" cy="143" r="1.5" />
                    </g>
                  )}
                  {faceDetails === "blush" && (
                    <g fill="#E11D48" opacity="0.24">
                      <ellipse cx="136" cy="140" rx="8.5" ry="4.8" />
                      <ellipse cx="188" cy="140" rx="8.5" ry="4.8" />
                    </g>
                  )}
                  {faceDetails === "mole" && (
                    <circle cx="184" cy="145" r="2.1" fill="#27272A" />
                  )}
                  {faceDetails === "dimples" && (
                    <g
                      stroke="#18181B"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      fill="none"
                      opacity="0.55"
                    >
                      <path d="M139 149c-2 2.5-2 5.5 0 8" />
                      <path d="M185 149c2 2.5 2 5.5 0 8" />
                    </g>
                  )}
                  {faceDetails === "bandaid" && (
                    <g transform="rotate(-8 162 133)">
                      <rect
                        x="149"
                        y="129"
                        width="26"
                        height="8"
                        rx="3.5"
                        fill="#FDE68A"
                        stroke="#18181B"
                        strokeWidth="1.6"
                      />
                      <circle cx="159" cy="133" r="1" fill="#B45309" />
                      <circle cx="165" cy="133" r="1" fill="#B45309" />
                    </g>
                  )}

                  {/* Accessories in 320x320 coordinate space */}
                  {accessory === "earringsStud" && (
                    <g fill={accessoryColor} stroke="#18181B" strokeWidth="1.5">
                      <circle cx="115" cy="136" r="3.4" />
                      <circle cx="209" cy="136" r="3.4" />
                    </g>
                  )}
                  {accessory === "earringsHoop" && (
                    <g
                      fill="none"
                      stroke={accessoryColor}
                      strokeWidth="2.4"
                      strokeLinecap="round"
                    >
                      <circle cx="114" cy="140" r="6" />
                      <circle cx="210" cy="140" r="6" />
                    </g>
                  )}
                  {accessory === "necklace" && (
                    <g fill="none">
                      <path
                        d="M136 189c6 13 46 13 52 0"
                        stroke={accessoryColor}
                        strokeWidth="2.8"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="162"
                        cy="201"
                        r="3.6"
                        fill={accessoryColor}
                        stroke="#18181B"
                        strokeWidth="1.3"
                      />
                    </g>
                  )}
                  {accessory === "headphones" && (
                    <g>
                      <path
                        d="M112 128c0-31 22-54 50-54s50 23 50 54"
                        fill="none"
                        stroke={accessoryColor}
                        strokeWidth="6"
                        strokeLinecap="round"
                      />
                      <rect
                        x="104"
                        y="116"
                        width="11"
                        height="24"
                        rx="5.5"
                        fill={accessoryColor}
                        stroke="#18181B"
                        strokeWidth="1.8"
                      />
                      <rect
                        x="209"
                        y="116"
                        width="11"
                        height="24"
                        rx="5.5"
                        fill={accessoryColor}
                        stroke="#18181B"
                        strokeWidth="1.8"
                      />
                    </g>
                  )}
                  {accessory === "lapelPin" && (
                    <g>
                      <circle
                        cx="188"
                        cy="232"
                        r="5.5"
                        fill={accessoryColor}
                        stroke="#18181B"
                        strokeWidth="1.6"
                      />
                      <circle cx="188" cy="232" r="2" fill="#FFFFFF" />
                    </g>
                  )}
                </g>
              </svg>
            ) : null}
          </>
        ) : (
          <div
            className="w-full h-full rounded-full bg-[#EDEBE6]"
            style={{ width: size, height: size }}
          />
        )}
      </div>
    </div>
  );
}
