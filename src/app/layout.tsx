import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "F1 Countdown",
  description:
    "Real-time countdown showing how long left until the next Formula One session, never miss any racing again!",
  icons: { icon: "/favicon.ico" },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
