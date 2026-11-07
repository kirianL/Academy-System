import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats amounts in Costa Rican Colones (₡) with tabular spacing
 */
export function formatColones(amount: number): string {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Formats numbers with Costa Rican locale separators
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("es-CR").format(value);
}

/**
 * Formats academic grades (0-100 scale) with 1 decimal place
 */
export function formatGrade(grade: number): string {
  return grade.toFixed(1);
}

