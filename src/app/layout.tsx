import { GoogleAnalytics } from "@next/third-parties/google";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <GoogleAnalytics gaId="G-7FSEV99573" />
      {children}
    </>
  );
}
