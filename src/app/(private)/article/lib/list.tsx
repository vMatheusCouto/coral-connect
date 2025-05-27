"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { supabase } from "@/app/utils/supabase"
import { useActionState, useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Filter, Heart, PlusCircle, Rocket, Star, Upload } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { DialogTitle } from "@radix-ui/react-dialog"
import { articleService, User } from '@/app/api/services/article'

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  created_by: string;
  created_by_name: string;
  stars: string;
}

export function ArticleList() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [stars, setStars] = useState<Record<string, number>>({})

  useEffect(() => {
    loadArticles()
  }, [])

  
  const loadArticles = async () => {
    try {
      const data = await articleService.getArticles('created_at');
      console.log('Fetched articles:', data)
      setArticles(data)
      setLoading(false)
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  const loadStars = async (articleId: string) => {
    try {
      const stars = await articleService.getSars(articleId);
      console.log('Fetched stars for article:', articleId, stars)
      setStars(prev => ({
        ...prev,
        [articleId]: stars.length
      }))
    } catch (error) {
      return error
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
      <div className="flex flex-row justify-between items-center px-4 max-md:flex-col">
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
      <Separator className="my-4 md:hidden" />
      
      <div className="flex flex-row flex-wrap gap-4 justify-center">
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
          articles.map((element: Article) => (
            <Card key={element.id} className="w-58 max-sm:w-72 basis-auto">
              <CardHeader>
                <div className="flex flex-row justify-between gap-4">
                  <div className="flex flex-col">
                    <CardTitle>{element.title}</CardTitle>
                    <CardDescription>{element.created_by_name}</CardDescription>
                  </div>
                  <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                    <AvatarImage alt="@shadcn" />
                    <AvatarFallback>
                      cn
                    </AvatarFallback>
                  </Avatar>
                </div>
                <Separator />
              </CardHeader>
              <CardContent className="flex flex-col gap-5 justify-between h-full">
                <div>
                  <p>{element.description}</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex justify-between border-1 rounded-lg">
                    <Button variant="ghost" onClick={() => setArticles(articles.map(article => 
                      article.id === element.id ? {...article, stars: (parseInt(article.stars) + 1).toString()} : article
                    ))}><Star />{element.stars}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}