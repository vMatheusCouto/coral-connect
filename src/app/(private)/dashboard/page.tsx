'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Star, MessageCircle } from "lucide-react"

import { useRouter } from "next/navigation"

export default function Page() {
  const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()

  return (
    <div>
      <main>
        {titles.map((title, j) => {
          return (
            <div key={j} className="flex flex-1 flex-col gap-4 p-8">
              <h1 className="text-4xl font-bold pl-4 mb-5">{title}</h1>
              <ScrollArea className="w-full md:ml-3">
              
              <div className="flex w-max space-x-4">
                {Array.from({length: 9}).map((_, i) => {
                    return (
                      <Card key={i} className="max-w-72">
                        <CardHeader >
                          <div className="flex flex-row items-center justify-between">
                            <div className="flex flex-col">
                              <CardTitle>The Silent Collapse</CardTitle>
                              <CardDescription>Dr. Emily Waters</CardDescription>
                            </div>
                            <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                          </div>
                          
                          <Separator className="mt-4" />
                        </CardHeader>
                        <CardContent className="flex flex-col gap-5">
                          <div>
                            <p>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</p>
                            
                          </div>
                          <div className="flex gap-3">
                          <Button type="button" onClick={() => router.push('/article/id')} className="flex-1">Acess</Button>
{/*                           <Button variant={"outline"} className="flex-1">Download</Button>
 */}                          
                          <div className="flex justify-between border-1 rounded-lg">
                              <Button variant="ghost" ><Star />50</Button>
                              <Button variant="ghost" ><MessageCircle />107</Button>
                            </div>
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
      </main>
    </div>
  )
}