import { getStaticParams } from "@/locale/server";

export default async function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

export function generateStaticParams() {
  return getStaticParams();
}
