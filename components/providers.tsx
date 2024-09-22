"use client";

import React from "react";
import ThemeProvider from "./theme-provider";
import { Toaster } from "@/components/sonner";
import NextTopLoader from "nextjs-toploader";
import { I18nProviderClient } from "@/locale/client";
import { Analytics } from "@vercel/analytics/react";

export default function Providers({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <Analytics />
        <Toaster />
        <NextTopLoader color="#01296B" zIndex={999} />
        <I18nProviderClient locale={locale}>{children}</I18nProviderClient>
      </ThemeProvider>
    </>
  );
}
