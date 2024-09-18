"use client";

import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import React, { useState } from "react";

const AccordionTitle = ({
  children,
  title,
  defaultOpen,
  ...props
}: React.ComponentProps<"div"> & {
  children: React.ReactNode;
  title: string;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen ?? false);

  return (
    <>
      <div
        {...props}
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 cursor-pointer my-2 w-full justify-between border-b border-border pb-2",
          props.className,
        )}
      >
        <h2 className="text-base font-medium">{title}</h2>
        <ChevronDownIcon
          className={cn("h-4 w-4", {
            "transform rotate-180": open,
          })}
        />
      </div>
      {open && children}
    </>
  );
};

export default AccordionTitle;
