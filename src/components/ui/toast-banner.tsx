"use client";

import * as React from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, X } from "@phosphor-icons/react";

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
}

export function ToastViewport({
  toasts,
  onDismiss,
}: {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{
              type: "spring",
              stiffness: 420,
              damping: 30,
            }}
            className="pointer-events-auto bg-[#23201E] text-white border border-white/10 rounded-2xl p-3.5 shadow-floating flex items-start justify-between gap-3"
          >
            <div className="flex items-start gap-2.5 min-w-0">
              <CheckCircle
                weight="fill"
                className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <div className="text-[13px] font-medium leading-tight">
                  {toast.title}
                </div>
                {toast.description && (
                  <div className="text-[11.5px] text-zinc-400 mt-1 leading-snug">
                    {toast.description}
                  </div>
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              aria-label="Cerrar notificación"
              className="text-zinc-400 hover:text-white p-0.5 rounded-md transition-colors"
            >
              <X weight="bold" className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
