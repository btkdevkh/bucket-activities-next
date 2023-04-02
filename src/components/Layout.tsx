import { ReactNode } from "react"
import Header from "./Header"

type ChildrenProps = {
  children: ReactNode
  authIsReady: boolean
  handleLogout: () => void
}

const Layout = ({ children, authIsReady, handleLogout }: ChildrenProps) => {
  return (
    <>
      <Header authIsReady={authIsReady} handleLogout={handleLogout} />
      <main>{children}</main>
    </>
  )
}

export default Layout
