import Image from "next/image";
import { Avatar, AvatarFallback } from "../ui/avatar";
import React from "react";
import { cn } from "@/lib/utils";
import { getFileUrlByKey } from "@/lib/s3";

export default function MemberAvatar({
  path,
  alt,
  size = "sm",
}: {
  path?: string;
  alt: string;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Avatar
      className={cn(
        size === "sm" ? "w-8 h-8 text-base" : "",
        size === "md" ? "w-12 h-12 text-lg" : "",
        size === "lg" ? "w-16 h-16 text-2xl" : "",
      )}
    >
      {!!path?.length ? (
        <Image
          src={getFileUrlByKey(path)}
          alt="Avatar"
          width={44}
          height={44}
          className={cn(`!w-full object-cover`)}
        />
      ) : (
        <AvatarFallback>
          {alt[0]} {alt?.[0] || ""}
        </AvatarFallback>
      )}
    </Avatar>
  );
}
