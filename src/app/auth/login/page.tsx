'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import { useRouter } from "next/navigation"
import { PasswordInput } from "@/components/ui/password-input"
import { Label } from "@/components/ui/label"
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form"
import { Form, useForm } from "react-hook-form"

export default function Page() {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()
  const form = useForm()

  const formPost = (value) => {
    console.log(value)
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center place-content-between gap-2 border-b px-4 max-w[calc(100% - 256px)]">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-row justify-center">
            <Input className="max-w-8/12 rounded-r-none"/>
            <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
              <Search />
            </Button>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </header>
        <main className="p-5 pt-10 px-8">
          
          
          <Button type="button" onClick={() => router.push('/')} variant={'outline'} className="m-6">
            Voltar ao início
          </Button>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}