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

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form'
import { zodResolver } from "@hookform/resolvers/zod"
import { ArticleSchema } from "../../../../schema"
import { Textarea } from "@/components/ui/textarea"
import { EditorGroup } from "@/components/ui/editor-group"

const articleCreation = () => {
  const form = useForm({
          resolver: zodResolver(ArticleSchema),
          defaultValues: {
              email: "",
              name: "",
              password: "",
              confirmPassword: ""
          }
      })
  
      const onSubmit = () => {
          console.log("submitted")
      }
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
        <main className="p-5 pt-10 px-8">
          <Form {...form}>
              <div className="flex flex-col gap-4">

                  <div className="flex flex-row gap-8">
                    <div className="flex flex-1 flex-col gap-4">

                      <FormField 
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Title</FormLabel>
                              <FormControl>
                                  <Input {...field} type="name" placeholder="title"/>
                              </FormControl>
                          </FormItem>
                      )}
                      />

                      <FormField          
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                          <FormItem>
                              <FormLabel>Co-Authors</FormLabel>
                              <FormControl>
                                  <Input {...field} type="email" placeholder="co-authors"/>
                              </FormControl>
                          </FormItem>
                      )}
                      />
                    </div>
                    <div className="flex-1">
                      <FormField          
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea {...field} type="name" placeholder="content" className="h-27"/>
                            </FormControl>
                        </FormItem>
                    )}
                    />

                    </div>
                  </div>
                  <FormField          
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                      <FormItem>
                          <div className="flex justify-between align-center">
                            <FormLabel>Content</FormLabel>
                            <EditorGroup />
                          </div>
                          <FormControl>
                              <Textarea {...field} type="name" placeholder="content" className="h-100"/>
                          </FormControl>
                      </FormItem>
                  )}
                  />
              </div>

          </Form>
          <div className="flex gap-4 max-w-full mt-5">
          <Button className="flex-1">
            Submit
          </Button>
          <Button type="button" onClick={() => router.push('/')} variant={'outline'} className="flex-1">
            Voltar ao início
          </Button>
          </div>
          
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default articleCreation