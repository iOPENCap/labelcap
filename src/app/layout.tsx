import Topbar from '@/components/Topbar'
import { Toaster } from '@/components/Toaster'
import './globals.css'


export const metadata = {
  title: 'Label Captions',
  description: 'label and check',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  )
}
