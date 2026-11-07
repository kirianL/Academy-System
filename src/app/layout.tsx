import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "slot-text/style.css";
import "./globals.css";
import { ProfileProvider } from "@/lib/profile-store";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NEXUS — Plataforma de Gestión Académica",
  description:
    "Sistema integral de gestión académica, asistencia, calificaciones y comunicaciones para instituciones educativas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-canvas text-ink-primary min-h-screen">
        <ProfileProvider>{children}</ProfileProvider>
      </body>
    </html>
  );
}

