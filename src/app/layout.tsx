"use client";

import Sidebar from "@/components/sidebar";
import { usePathname } from "next/navigation"; // Importa o hook
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname(); // Obtém o caminho atual da URL

  // Verifica se a página atual é de login ou registro
  const isLoginOrRegisterPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="pt-br">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body className="flex">
        {!isLoginOrRegisterPage && <Sidebar />}
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}