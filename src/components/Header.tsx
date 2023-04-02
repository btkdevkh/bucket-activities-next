import Link from "next/link"
import headerStyles from "@/styles/Header.module.css"

type HeaderProps = {
  authIsReady: boolean
  handleLogout: () => void
}

const Header = ({ authIsReady, handleLogout }: HeaderProps) => {
  return (
    <header className={headerStyles.navbar}>
      <div>
        <span>
          <img src={"/marker.png"} />
        </span>
        <h1>Bucket Activités</h1>
      </div>

      <nav>
        <ul>
          {authIsReady && (
            <li>
              <Link href="#" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
