"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { LogoText } from "@/components/logo-text";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/sidebar";
import { User } from "@/db";
import { cn } from "@/lib/utils";
import { ChevronRight, LayoutDashboard, Settings2, User2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserMenu } from "./user-menu";
import Link from "next/link";
import { ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";

export function AppSidebar({ user }: { user: User }) {
  const pathName = usePathname();
  const [openIndexes, setOpenIndexes] = useState([0]);
  const router = useRouter();
  let nav: {
    title: string;
    url: string;
    icon: React.FC;
    items?: { title: string; url: string }[];
  }[] = [];

  if (user.role === "CONSULTANT") {
    nav = [
      {
        title: "Dashboard",
        url: `/app`,
        icon: LayoutDashboard,
      },
      {
        title: "Reports",
        url: `/reports`,
        icon: ClipboardDocumentCheckIcon,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: `/app/settings/overview`,
          },
        ],
      },
    ];
  }

  if (user.role === "CUSTOMER") {
    nav = [
      {
        title: "Dashboard",
        url: `/app`,
        icon: LayoutDashboard,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: `/app/settings/overview`,
          },
        ],
      },
    ];
  }

  if (user.role === "ADMINISTRATOR") {
    nav = [
      {
        title: "Dashboard",
        url: `/app`,
        icon: LayoutDashboard,
      },
      {
        title: "Éditeur de formulaire",
        url: `/app/admin/form`,
        icon: ClipboardDocumentCheckIcon,
      },
      {
        title: "Gestion des utilisateurs",
        url: `/app/admin/users`,
        icon: User2,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: `/app/settings/overview`,
          },
        ],
      },
    ];
  }

  useEffect(() => {
    const index = nav.findIndex(
      (item) => item.items?.some((subItem) => subItem.url === pathName),
    );

    if (index !== -1) {
      setOpenIndexes([index]);
    }
  }, [pathName]);

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/app">
          <LogoText className="mt-4 px-4 h-10 mx-auto" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {nav.map((item, index) => (
              <Collapsible
                key={item.title}
                asChild
                open={openIndexes.includes(index)}
                onClick={() => {
                  if (openIndexes.includes(index)) {
                    setOpenIndexes(openIndexes.filter((i) => i !== index));
                  } else {
                    setOpenIndexes([...openIndexes, index]);
                  }
                }}
                className="cursor-pointer"
              >
                <SidebarMenuItem>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    {item.items?.length ? (
                      <p>
                        <item.icon />
                        <span>{item.title}</span>
                      </p>
                    ) : (
                      <a
                        href={item.url}
                        className={cn(
                          item.url === pathName &&
                            "bg-sidebar-accent text-primary-background rounded-md",
                        )}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    )}
                  </SidebarMenuButton>
                  {item.items?.length ? (
                    <>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                          <ChevronRight />
                          <span className="sr-only">Toggle</span>
                        </SidebarMenuAction>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items?.map((subItem) => (
                            <SidebarMenuSubItem
                              key={subItem.title}
                              className={cn(
                                subItem.url === pathName &&
                                  "bg-sidebar-accent text-primary-background rounded-md",
                              )}
                            >
                              <SidebarMenuSubButton asChild>
                                <Link
                                  prefetch
                                  href={subItem.url}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    router.push(subItem.url);
                                  }}
                                >
                                  <span>{subItem.title}</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </>
                  ) : null}
                </SidebarMenuItem>
              </Collapsible>
            ))}
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu
              name={user.name}
              email={user.email}
              imagePath={user.imagePath || undefined}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
