import type { Metadata } from 'next'
import { Providers } from '../app/providers'

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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}