
import "../globals.css";

import NextTopLoader from 'nextjs-toploader';

import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Providers } from "@/providers/session";
import { getServerAuthSession } from '@/servers/auth'
import { Toaster } from "@/components/ui/toaster"

import LeftSidebar from "@/components/shared/sidebar";
import Topbar from "@/components/shared/topbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fermon: Fertilizer Monitoring Distribution",
  description: "At Saptakarya, we blend creativity with precision to transform your ideas into reality. Discover our comprehensive range of innovative solutions designed to elevate your business to new heights. Partner with us and unlock the potential of your vision today. Welcome to Saptakarya – Where Innovation Meets Excellence.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const authSession = await getServerAuthSession()

  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body className={inter.className}>
        <NextTopLoader showSpinner={false} />
        <main className="flex flex-row">
          {authSession && <LeftSidebar />}
          {authSession && <Topbar />}
          <section className="main-container">
            <div className="w-full max-w-screen">
              <Providers>{children}</Providers>
            </div>
          </section>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
