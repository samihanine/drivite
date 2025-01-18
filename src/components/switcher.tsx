"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./dropdowmenu";
import { SidebarMenuButton, useSidebar } from "./sidebar";
import { ChevronsUpDown, Plus } from "lucide-react";
import * as React from "react";

export function Switcher({
  items,
  activeItemId,
  setActiveItemId,
  title,
  addItemTitle,
  onAddItem,
}: {
  items: {
    name: string;
    logo: React.ElementType;
    plan: string;
    id: string;
  }[];
  activeItemId: string;
  setActiveItemId: (id: string) => void;
  title: string;
  addItemTitle: string;
  onAddItem: () => void;
}) {
  const { isMobile } = useSidebar();
  const activeItem = items.find((item) => item.id === activeItemId) || items[0];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground">
            <activeItem.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{activeItem.name}</span>
            <span className="truncate text-xs">{activeItem.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        align="start"
        side={isMobile ? "bottom" : "right"}
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          {title}
        </DropdownMenuLabel>
        {items.map((item, index) => (
          <DropdownMenuItem
            key={item.name}
            onClick={() => setActiveItemId(item.id)}
            className="gap-2 p-2"
          >
            <div className="flex size-6 items-center justify-center rounded-sm border">
              <item.logo className="size-4 shrink-0" />
            </div>
            {item.name}
            <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="gap-2 p-2 cursor-pointer"
          onClick={onAddItem}
        >
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground">
            {addItemTitle}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
