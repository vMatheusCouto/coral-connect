'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import { useRouter } from "next/navigation"

import { supabase } from "@/app/utils/supabase"
import { ModeToggle } from "@/components/ui/mode-toggle"

const addForm = async () => {
  try {
    console.log("Add button clicked")
    const { data, error } = await supabase
      .from("countries")
      .insert([{ name: "Brazil" }])
      .select()
    console.log("Data:", data, "Error:", error)
    if (error) {
      // Optionally alert the user or handle the error 
      console.error("Error inserting:", error)
    }
  } catch (err) {
    console.error("Unexpected error:", err)
  }
}

export default function Page() {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()

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
          {titles.map((title, j) => {
            return (
              <div key={j} className="flex flex-1 flex-col gap-4 p-8">
                <h1 className="text-4xl font-bold pl-4 mb-5">{title}</h1>
                <ScrollArea className="w-full md:ml-3">
                
                <div className="flex w-max space-x-4">
                  {Array.from({length: 9}).map((_, i) => {
                      return (
                        <Card key={i} className="max-w-72">
                          <CardHeader>
                            <CardTitle>The Silent Collapse</CardTitle>
                            <CardDescription>Dr. Emily Waters</CardDescription>
                            <Separator />
                          </CardHeader>
                          <CardContent className="flex flex-col gap-5">
                            <div>
                              <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                            </div>
                            <div className="flex gap-3">
                            <Button type="button" onClick={() => router.push('/article/id')} className="flex-1">Acess</Button>
                            <Button variant={"outline"} className="flex-1">Download</Button>
                            </div>
                          </CardContent>
                        </Card>
                      )})}
                </div>

                <ScrollBar orientation="horizontal"/>
                </ScrollArea>
              </div>
            )
          })}
          <div className="flex flex-row gap-2 m-4">
            <ModeToggle />
            <Button variant={'outline'} type="button" onClick={() => router.push('/auth/login')} className="flex-1">Login</Button>
            <Button variant={'outline'} type="button" onClick={() => router.push('/auth/register')} className="flex-1">Register</Button>
          </div>
          <Button onClick={() => addForm()}>Add</Button>
      </SidebarInset>
    </SidebarProvider>
  )
}