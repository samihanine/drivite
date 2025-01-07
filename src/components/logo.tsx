"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoText from "/public/images/logos/logo-text.svg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={LogoText}
      alt=""
      className={cn("h-8 w-auto sm:h-9 md:hidden lg:block lg:h-12", className)}
    />
  );
}
