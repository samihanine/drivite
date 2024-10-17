"use client";

import { PhoneIcon } from "@heroicons/react/24/solid";
import { Button } from "../../../components/button";
import { useI18n } from "@/locale/client";
import React from "react";

export function PhoneButton(props: React.ComponentProps<typeof Button>) {
  const t = useI18n();
  return (
    <a href="tel:+33633827173" rel="nofollow">
      <Button variant={"secondary"} {...props}>
        <span className="flex items-center">
          <PhoneIcon className="h-4 w-4 mr-2" />
          {t("header.cta")}
        </span>
      </Button>
    </a>
  );
}
