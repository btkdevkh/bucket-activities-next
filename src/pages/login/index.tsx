import Link from "next/link"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import loginStyles from "@/styles/login.module.css"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/config"
import { useRouter } from "next/router"

const Login = ({ authIsReady }: any) => {
  const router = useRouter()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await signInWithEmailAndPassword(auth, values.email, values.password)
  }

  useEffect(() => {
    if (authIsReady) router.push("/admin")
  }, [authIsReady])

  return (
    <form className={loginStyles.login} onSubmit={handleSubmit}>
      <div className={loginStyles.container}>
        <h2 className={loginStyles.h2}>Login</h2>
        <input
          className={loginStyles.input}
          type="text"
          placeholder="Email"
          value={values.email}
          onChange={handleChange}
          name="email"
        />
        <input
          className={loginStyles.input}
          type="password"
          placeholder="Password"
          value={values.password}
          onChange={handleChange}
          name="password"
        />
        <input className={loginStyles.input} type="submit" value="Submit" />
      </div>
      <Link href="/" data-back>
        Back
      </Link>
    </form>
  )
}

export default Login
