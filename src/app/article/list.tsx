"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getUserName } from "./userName"
import { supabase } from "../utils/supabase"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ArticleForm } from "./creation/form"
import { Filter, PlusCircle } from "lucide-react"

interface Article {
  id: string;
  title: string;
  description: string;
  created_by: string;
}

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [userNames, setUserNames] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchArticles()

    const channel = supabase
      .channel('articles-changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'articles' 
        }, 
        (payload) => {
          console.log('Change received!', payload)
          fetchArticles()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
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
        console.error('Error fetching user name:', fetchError)
        return
      }
      
      setUserNames(prev => ({
        ...prev,
        [userId]: fetchedUser.name
      }))
    } catch (error) {
      console.error('Unexpected error fetching user name:', error)
    }
  }

  const fetchArticles = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('articles')
        .select()

      if (error) {
        console.error('Error fetching articles:', error)
        return
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle />
              Add new article
              </Button>
          </DialogTrigger>
          <DialogContent>
            <ArticleForm />
          </DialogContent>
        </Dialog>
        </div>
        
      </div>
      
        <div className="grid grid-cols-4 gap-4">
    {loading ? (
      Array.from({ length: 12 }).map((_: any, index: number) => {
        return (
          <div key={index} className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
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
              <h2>{element.description}</h2>
            </div>
            <div className="flex gap-3">
              <Button type="button" className="flex-1">Acess</Button>
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