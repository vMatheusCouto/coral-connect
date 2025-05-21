'use client'

import { Button } from "@/components/ui/button"

import { useRouter } from "next/navigation"
import RegisterForm from "@/app/auth/register-form"
import Link from "next/link"
import LoginForm from "../login-form"
import { useState } from "react"
import Image from "next/image"

const RegisterPage = () => {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()
  const [type, setType] = useState(true);

  return (
    <main className="flex flex-1 w-screen h-screen items-center justify-around absolute inset-0 bg-background bg-[radial-gradient(#141414_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="align-center justify-center max-sm:hidden">
          <h1 className="font-bold text-9xl leading-28 -mt-8">Coral<br/>Connect</h1>
          <h2 className="ml-4 mt-4 text-2xl">Share yours articles <strong>here,</strong> and connect to the <strong>world.</strong></h2>
          <Image
          src="https://cdn.creazilla.com/cliparts/15591036/coral-reef-clipart-xl.png"
          
          width={500}
          height={500}
          alt="Picture of the author"
          className="invert fixed -bottom-40 -scale-x-100 opacity-80"
          />
          <Image
          src="https://cdn.creazilla.com/cliparts/15591036/coral-reef-clipart-xl.png"
          
          width={500}
          height={500}
          alt="Picture of the author"
          className="invert fixed -top-40 -scale-x-100 -scale-y-100 opacity-80"
          />
        </div>
        {
          type == true ? <LoginForm /> : <RegisterForm/>
        }
        <Link href="/" className="absolute bottom-4 hover:opacity-70 font-stretch-extra-condensed">Coral Connect</Link>
        <Button className="absolute top-4 hover:opacity-70 text-foreground" variant={"link"} onClick={() => setType(!type)}>Alternar [temp]</Button>
    </main>
  )
}

export default RegisterPage