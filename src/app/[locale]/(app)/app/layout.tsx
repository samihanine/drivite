import { SidebarProvider } from "@/components/sidebar";
import { AppSidebar } from "@/features/user/components/user-sidebar";
import { getCurrentUser } from "@/features/user/queries/get-current-user";
import { getI18n } from "@/locale/server";
import "@/styles/globals.css";

export async function generateMetadata(_: {
  params: Promise<{ lang: string }>;
}) {
  const t = await getI18n();
  return {
    title: t("home.metaTitle"),
    description: t("common.description"),
    twitter: {
      card: "summary_large_image",
      title: t("common.title"),
      description: t("common.description"),
      creator: "@_sam0411",
    },
    metadataBase: process.env.NEXT_PUBLIC_BASE_URL || "",
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const user = await getCurrentUser();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <>
      <SidebarProvider className="w-full !min-h-[calc(100vh)-56px] flex">
        <AppSidebar user={user} />
        <div className="flex-1">{children}</div>
      </SidebarProvider>
    </>
  );
}
