import "./globals.css";

export default function RootLayout({children,}: {children: React.ReactNode}) 
{
  return (
    <html lang="pt-br">
      <head>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}