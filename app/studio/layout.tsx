export const metadata = {
  title: "Studio - TVL Conseils",
  description: "This is the cms studio page",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
