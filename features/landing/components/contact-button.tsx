"use client";

import { PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../components/button";
import { useI18n } from "@/locale/client";
import React from "react";
import Link from "next/link";

export function ContactButton(props: React.ComponentProps<typeof Button>) {
  const t = useI18n();
  return (
    <Link href="/contact">
      <Button size={"lg"} variant={"secondary"} {...props}>
        {t("home.hero.cta")} →
      </Button>
    </Link>
  );
}
