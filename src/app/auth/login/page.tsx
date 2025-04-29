'use client'

import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import LoginForm from "@/app/auth/login-form"

const Login = () => {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()

  return (
    <main className="flex flex-1 w-screen h-screen items-center justify-center">
        <LoginForm />
    </main>
  )
}

export default Login