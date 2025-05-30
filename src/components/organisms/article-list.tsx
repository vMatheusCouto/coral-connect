"use client"

import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { articleService } from '@/services/article'
import ArticleCard from "../molecules/article-card"
import { Article } from "@/types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export function ArticleList({ variant, userIdServer }: { variant: string, userIdServer: string }) {
  const [loading, setLoading] = useState(true)
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    loadArticles()
  }, [])

  
  const loadArticles = async () => {
    try {
      const data = await articleService.getArticles('created_at');
      if (data) {setArticles(data as Article[])}
      setLoading(false)
    } catch (error) {
      console.error('Unexpected error:', error)
    }
  }

  return (
    <div className={variant == 'grid' ? 'flex flex-row flex-wrap gap-4 justify-center w-full' : ''}>
      {variant == 'row' ? (
        <ScrollArea className="w-full md:ml-3">
          <div className="flex w-max space-x-4">
            {loading ? (
              Array.from({ length: 12 }).map((_: any, index: number) => {
                return (
                  <div key={index} className="flex flex-col space-y-3">
                    <Skeleton className="h-36 w-56 rounded-xl" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-52" />
                      <Skeleton className="h-4 w-48" />
                    </div>
                  </div>
                )
              })
            ) : articles.length === 0 ? (
              <div className="col-span-4 text-center py-4">No articles found</div>
            ) : (
              articles.map((element: Article) => (
                <ArticleCard key={element.id} element={element} setArticles={setArticles} articles={articles} userIdServer={userIdServer} size={variant == 'row' ? "mid" : "small"}/>
              ))
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      ) : (
        <>
          {loading ? (
            Array.from({ length: 12 }).map((_: any, index: number) => {
              return (
                <div key={index} className="flex flex-col space-y-3">
                  <Skeleton className="h-36 w-56 rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-52" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              )
            })
          ) : articles.length === 0 ? (
            <div className="col-span-4 text-center py-4">No articles found</div>
          ) : (
            articles.map((element: Article) => (
              <ArticleCard key={element.id} element={element} setArticles={setArticles} articles={articles} userIdServer={userIdServer} size={variant == 'row' ? "mid" : "small"}/>
            ))
          )}
        </>
      )}
    </div>
  )
}