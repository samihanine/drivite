"use client";

import React from "react";
import ThemeProvider from "./theme-provider";
import { Toaster } from "@/components/sonner";
import NextTopLoader from "nextjs-toploader";
import { I18nProviderClient } from "@/locale/client";

export default function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Toaster />
        <NextTopLoader zIndex={99999} color="#f97415" />
        <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      </ThemeProvider>
    </>
  );
}
