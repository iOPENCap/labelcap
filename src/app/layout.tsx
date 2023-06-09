import { Toaster } from '@/components/Toaster'
import './globals.css'
import AuthContext from './context/AuthContext'

export const metadata = {
  title: 'Label Captions',
  description: 'label and check',
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthContext>
          <Toaster />
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
