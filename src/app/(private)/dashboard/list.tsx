'use client'

import { articleService } from "@/app/api/services/article"
import { supabase } from "@/app/utils/supabase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Star, MessageCircle } from "lucide-react"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

/* interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  created_by: string;
}

interface ArticleListProps {
  userIdServer: string;
} */

export default function ListPage(/* {userIdServer}: ArticleListProps */) {
  interface Article {
    id: string;
    title: string;
    description: string;
    content: string;
    created_by: string;
  }
  
  const [articles, setArticles] = useState<Article[]>([])
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await articleService.getArticles('created_at');
        console.log('Fetched articles:', data)
        setArticles(data)
      } catch (error) {
        console.error('Unexpected error:', error)
      }
    }
    fetchArticles()
  }, [])
  /* const titles: string[] = ['Featured articles', 'Recent articles', 'All articles', 'Most viewed', 'Explore']
  const router = useRouter()
  
    const [articles, setArticles] = useState<Article[]>([])
    const [userNames, setUserNames] = useState<Record<string, string>>({})
    const [stars, setStars] = useState<Record<string, number>>({})
    const [userStarred, setUserStarred] = useState<Record<string, boolean>>({})
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
              fetchStar(article.id)
              fetchUserStarred(article.id)
            }
          })
        } catch (error) {
          console.error('Unexpected error:', error)
        } finally {
          setLoading(false)
        }
      }
    
      const fetchStar = async (articleId: string) => {
        if (stars[articleId]) return;
        
        try {
          const { data: fetchedStar, error: fetchError } = await supabase
            .from('stars')
            .select('*')
            .eq('article_id', articleId)
          
          if (fetchError || !fetchedStar) {
            return
          }
    
          const count = fetchedStar.length;
          console.log(count)
          
          setStars(prev => ({
            ...prev,
            [articleId]: count
          }))
        } catch (error) {
          throw new Error(error as string)
        }
      }
    
      const fetchUserStarred = async (articleId: string) => {
        try {
          const { data: fetchedUserStarred, error } = await supabase
            .from('stars')
            .select('*')
            .eq('article_id', articleId)
            .eq('user_id', userIdServer)
          
          const hasStarred = fetchedUserStarred && fetchedUserStarred.length > 0
        
          setUserStarred(prev => ({
            ...prev,
            [articleId]: hasStarred
          }))
        } catch (error) {
          console.error('Error checking star status:', error)
          setUserStarred(prev => ({
            ...prev,
            [articleId]: false
          }))
        }
      }
    
      const handleStar = async (articleId: string) => {
        const { data: fetchedStar } = await supabase
          .from('stars')
          .select('*')
          .eq('article_id', articleId)
          .eq('user_id', userIdServer)
    
        const userAlreadyStarred = fetchedStar && fetchedStar.length > 0
        
        if (userAlreadyStarred) {
          await supabase
            .from('stars')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', userIdServer)
    
          setUserStarred(prev => ({
            ...prev,
            [articleId]: false
          }))
    
          setStars(prev => ({
            ...prev,
            [articleId]: Math.max(0, (prev[articleId] || 1) - 1)
          }))
        }
        else {
          await supabase
            .from('stars')
            .insert([
              {
                user_id: userIdServer,
                article_id: articleId
              }
            ])
    
          setUserStarred(prev => ({
            ...prev,
            [articleId]: true
          }))
    
          setStars(prev => ({
            ...prev,
            [articleId]: (prev[articleId] || 0) + 1
          }))
        }
      } */

  return (
    <div>
      <main>
        {articles.map((article) => (
          <div key={article.id} className="p-4 border-b last:border-0">
            <h2 className="text-lg font-semibold">{article.title}</h2>
            <p className="text-sm text-gray-600">{article.description}</p>
          </div>
        ))}
      </main>
    </div>
  )
}