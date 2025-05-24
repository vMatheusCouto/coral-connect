"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/app/utils/supabase"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Filter, PlusCircle } from "lucide-react"
import Link from "next/link"

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  created_by: string;
}

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [userNames, setUserNames] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchUserName = async (userId: string) => {
    if (userNames[userId]) return;
    
    try {
      const { data: fetchedUser, error: fetchError } = await supabase
        .from('auth-users')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (fetchError || !fetchedUser) {
        return
      }
      
      setUserNames(prev => ({
        ...prev,
        [userId]: fetchedUser.name
      }))
    } catch (error) {
      throw new Error(error as string)
    }
  }

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select()

      if (error) {
        return error
      }

      const articlesData = data as Article[] || []
      setArticles(articlesData)

      articlesData.forEach(article => {
        if (article.created_by) {
          fetchUserName(article.created_by)
        }
      })
    } catch (error) {
      console.error('Unexpected error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <div className="flex flex-row justify-between items-center px-4">
        <h1 className="text-4xl font-bold mb-5">All articles</h1>
        <div className="flex flex-row gap-2">
          <Button variant="outline" >
            <Filter />
            Filter
          </Button>
          <Link href="/article/creation">
            <Button>
              <PlusCircle />
              Add new article
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-4">
        {loading ? (
          Array.from({ length: 12 }).map((_: any, index: number) => {
            return (
              <div key={index} className="flex flex-col space-y-3">
                <Skeleton className="h-36 w-60 rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-56" />
                  <Skeleton className="h-4 w-52" />
                </div>
              </div>
            )
          })
        ) : articles.length === 0 ? (
            <div className="col-span-4 text-center py-4">No articles found</div>
        ) : (
          articles.slice().reverse().map((element: Article) => (
            <Card key={element.id} className="max-w-72">
              <CardHeader>
                <CardTitle>{element.title}</CardTitle>
                <CardDescription>{userNames[element.created_by] || 'Loading user...'}</CardDescription>
                <Separator />
              </CardHeader>
              <CardContent className="flex flex-col gap-5 justify-between h-full">
                <div>
                  <p>{element.description}</p>
                </div>
                <div className="flex gap-3">
                  
                  <Dialog>
                    <DialogTrigger asChild>
                    <Button type="button" className="flex-1">Acess</Button>
                    </DialogTrigger>
                    <DialogContent className="h-8/10 flex flex-row">
                      <div className="border-1 p-12 rounded-lg shadow-md bg-card/90 w-full overflow-y-scroll"
                        dangerouslySetInnerHTML={{ __html: element.content }}>
                        </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant={"outline"} className="flex-1">Download</Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}