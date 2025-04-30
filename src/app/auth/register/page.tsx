'use client'

import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import RegisterForm from "@/app/auth/register-form"
import Link from "next/link"

const RegisterPage = () => {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()

  return (
    <main className="flex flex-1 w-screen h-screen items-center justify-center absolute inset-0 bg-background bg-[radial-gradient(#141414_1px,transparent_1px)] [background-size:16px_16px]">
        <RegisterForm />
        <Link href="/" className="absolute bottom-4 hover:opacity-70">Coral Connect</Link>
    </main>
  )
}

export default RegisterPage