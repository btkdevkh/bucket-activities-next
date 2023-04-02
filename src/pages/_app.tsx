import "@/styles/globals.css"
import type { AppProps } from "next/app"
import Layout from "@/components/Layout"
import { useEffect, useState } from "react"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth } from "@/firebase/config"

export default function App({ Component, pageProps }: AppProps) {
  const [authIsReady, setAuthIsReday] = useState(false)

  const unsub = onAuthStateChanged(auth, (user: any) => {
    if (user) {
      setAuthIsReday(true)
    } else {
      setAuthIsReday(false)
    }
  })

  const handleLogout = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    return unsub
  }, [])

  return (
    <Layout authIsReady={authIsReady} handleLogout={handleLogout}>
      <Component {...pageProps} authIsReady={authIsReady} />
    </Layout>
  )
}
