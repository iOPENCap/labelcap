import Topbar from '@/components/Topbar'
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
        <Topbar>{children}</Topbar>
      </body>
    </html>
  )
}
