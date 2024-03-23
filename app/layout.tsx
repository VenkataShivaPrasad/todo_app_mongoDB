import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/app.scss"
import Header from "./Header";
import { ContextProvider } from "@/components/Clients";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "This is a todo app project using nextjs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <>
          <Header/>
          {children}
          </>
        </ContextProvider>
      </body>
    </html>
  );
}
