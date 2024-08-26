

import type { Metadata } from 'next';
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: 'DecentralTune',
  description: 'A decentralized music app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  )
}