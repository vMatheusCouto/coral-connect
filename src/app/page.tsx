import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function Page() {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
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
                <ScrollArea className="w-full md:ml-3.5">
                
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
                            <Button className="flex-1">Acessar</Button>
                            <Button variant={"outline"} className="flex-1"/>
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
          
      </SidebarInset>
    </SidebarProvider>
  )
}