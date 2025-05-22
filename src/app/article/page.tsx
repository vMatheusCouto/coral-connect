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

import { ModeToggle } from "@/components/ui/mode-toggle"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArticleList } from "./list"
import { ArticleForm } from "./creation/form"

export default function Page() {

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
          <ArticleList />
          <div className="flex flex-row gap-2 m-4">
            <ModeToggle />
          </div>
      </SidebarInset>
    </SidebarProvider>
  )
}