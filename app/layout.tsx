import { ThemeProvider } from "../libs/providers/ThemeProvider";

import { Providers } from "../libs/redux/provider";

import Navbar from "../components/navbar/Navbar";
import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import InvoiceModal from "../components/modals/InvoiceModal/InvoiceModal";
import Container from "../components/shared/Container";
import DeleteModal from "../components/modals/DeleteModal";

import getCurrentUser from "./actions/getCurrentUser";

import "./globals.css";
import { League_Spartan } from "next/font/google";

import ToasterProvider from "../libs/providers/ToasterProvider";

const spartan = League_Spartan({
  subsets: ["latin"],
  variable: "--spartan-font",
});

export const metadata = {
  generator: "Next.js",
  applicationName: "Invoice solana",
  title: "Invoice solana",
  description: "Invoice solana",
  keywords: ["nextjs", "frontend mentor", "invoice app"],

  openGraph: {
    title: "Invoice solana",
    description: "Invoice solana",

    type: "website",

    siteName: "Invoice solana",
  },

  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <>
      <html className="bg-background" lang="en" suppressHydrationWarning>
        <body className={spartan.className}>
          <Providers>
            <ToasterProvider />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <RegisterModal />
              <LoginModal />
              <InvoiceModal />
              <DeleteModal />
              <Navbar currentUser={currentUser} />
              <Container>
                <main className="flex flex-col w-full h-full gap-14">
                  {children}
                </main>
              </Container>
            </ThemeProvider>
          </Providers>
        </body>
      </html>
    </>
  );
}
