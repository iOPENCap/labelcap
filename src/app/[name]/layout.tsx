import Topbar from "@/components/Topbar"

interface MainLayoutProps {
  children: React.ReactNode,
  params: { name: string },
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, params }) => {
  const { name } = params;
  return (
    <html lang="en">
      <body>
        <main><Topbar user={name}>{children}</Topbar></main>
      </body>
    </html>
  )
}

export default MainLayout;