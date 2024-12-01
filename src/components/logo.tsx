"use client";

import Image from "next/image";
import Logo from "/public/images/logos/logo.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function LogoText({ className = "" }: { className?: string }) {
  return (
    <Image
      src={Logo}
      alt=""
      className={cn("h-8 w-auto sm:h-9 md:hidden lg:block lg:h-12", className)}
    />
  );
}
