'use client'

import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import RegisterForm from "@/app/auth/register-form"

const RegisterPage = () => {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()

  return (
    <main className="flex flex-1 w-screen h-screen items-center justify-center">
        <RegisterForm />
    </main>
  )
}

export default RegisterPage