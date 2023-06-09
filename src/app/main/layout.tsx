import Topbar from "@/components/Topbar"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main><Topbar>{children}</Topbar></main>
      </body>
    </html>
  )
}
