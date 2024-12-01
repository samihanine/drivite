"use client";

import Image from "next/image";
import LogoText from "/public/images/logos/logo-text.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src={LogoText}
      alt=""
      className={cn("h-8 w-auto sm:h-9 md:hidden lg:block lg:h-12", className)}
    />
  );
}
