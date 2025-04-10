import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar } from "@radix-ui/react-avatar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-8">
          <h1 className="text-4xl font-bold">Artigos recentes</h1>
          <Carousel 
            opts={{
              align: "start",
            }}
            className="w-full max-w-6xl"
          >
            <CarouselContent className="-ml-1">
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>The Silent Collapse</CardTitle>
                    <CardDescription>Dr. Emily Waters</CardDescription>
                    <Avatar />
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>The Silent Collapse</CardTitle>
                    <CardDescription>Dr. Emily Waters</CardDescription>
                    <Avatar />
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>The Silent Collapse</CardTitle>
                    <CardDescription>Dr. Emily Waters</CardDescription>
                    <Avatar />
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>The Silent Collapse</CardTitle>
                    <CardDescription>Dr. Emily Waters</CardDescription>
                    <Avatar />
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>The Silent Collapse</CardTitle>
                    <CardDescription>Dr. Emily Waters</CardDescription>
                    <Avatar />
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>

              <CarouselItem className="md:basis-1/2 lg:basis-2/3">
                <Card className="w-[350px]">
                  <CardHeader>
                    <CardTitle>The Silent Collapse</CardTitle>
                    <CardDescription>Dr. Emily Waters</CardDescription>
                    <Avatar />
                    <Separator />
                  </CardHeader>
                  <CardContent>
                    <div>
                      <h2>This paper explores the accelerating phenomenon of coral bleaching and its devastating impact on marine ecosystems.</h2>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}