"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import Logo from "/public/images/logos/logo-text.svg";

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <Image
      src={Logo}
      alt=""
      className={cn("h-8 w-auto sm:h-9 md:hidden lg:block lg:h-12", className)}
    />
  );
}
