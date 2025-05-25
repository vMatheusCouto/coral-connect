'use client'

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
        {/* {titles.map((title, j) => {
          return (
            <div key={j} className="flex flex-1 flex-col gap-4 p-8">
              <h1 className="text-4xl font-bold pl-4 mb-5">{title}</h1>
              <ScrollArea className="w-full md:ml-3">
              
              <div className="flex w-max space-x-4">
                {articles.map((element) => {
                    const ArticleCard = () => {
                        return (
                            <Card key={element.id} className="max-w-72">
                              <CardHeader >
                                <div className="flex flex-row items-center justify-between">
                                  <div className="flex flex-col">
                                    <CardTitle>{element.title}</CardTitle>
                                    <CardDescription>{userNames[element.created_by]}</CardDescription>
                                  </div>
                                  <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>
                                </div>
                                
                                <Separator className="mt-4" />
                              </CardHeader>
                              <CardContent className="flex flex-col gap-5 h-full justify-between">
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
                                <div className="flex justify-between border-1 rounded-lg">
                                <Button variant="ghost" onClick={() => handleStar(element.id)} ><Star className={userStarred[element.id] ? "fill-foreground" : ""} />{stars[element.id] || '0'}</Button>
                                <Button variant="ghost" ><MessageCircle />107</Button>
                                  </div>
                              </div>
                                
                              </CardContent>
                            </Card>
                          )
                    }

                    if (title === 'Featured articles' && stars[element.id] > 0) {
                        return (
                            <ArticleCard />
                        )
                    };
                    
                    if (title != 'Featured articles') { return (<ArticleCard />) }
                    })}
              </div>

              <ScrollBar orientation="horizontal"/>
              </ScrollArea>
            </div>
            )
        })} */}
        <h1>Manutenção</h1>
      </main>
    </div>
  )
}