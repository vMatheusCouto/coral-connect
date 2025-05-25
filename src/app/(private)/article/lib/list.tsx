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
import { postcomment } from "./postComment"

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  created_by: string;
}

interface Commentary {
  id: string;
  created_at: Date;
  article_id: string;
  created_by: string;
  content: string;
}

interface ArticleListProps {
  userIdServer: string;
}

export function ArticleList({ userIdServer }: ArticleListProps) {
  const [articles, setArticles] = useState<Article[]>([])
  const [userNames, setUserNames] = useState<Record<string, string>>({})
  const [stars, setStars] = useState<Record<string, number>>({})
  const [userStarred, setUserStarred] = useState<Record<string, boolean>>({})
  const [commentaries, setCommentaries] = useState<Record<string, Array<Commentary>>>({})
  const [likes, setLikes] = useState<Record<string, number>>({})
  const [userLiked, setUserLiked] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(true)
  const [state, postAction] = useActionState(postcomment, undefined)

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
          fetchCommentaries(article.id)
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
      
      const hasStarred = !!(fetchedUserStarred && fetchedUserStarred.length > 0)
    
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
  }

  const fetchCommentaries = async (articleId: string) => {
    const { data } = await supabase
      .from('commentaries')
      .select('*')
      .eq('article_id', articleId)

    setCommentaries(prev => ({
      ...prev,
      [articleId]: data as Commentary[]
    }))

    data?.forEach(commentary => {
      fetchLikes(commentary.id)
      fetchUserLiked(commentary.id)
    })
  }

  const fetchUserLiked = async (commentId: string) => {
    try {
      const { data: fetchedUserLiked, error } = await supabase
        .from('likes')
        .select('*')
        .eq('created_by', userIdServer)
        .eq('comment_id', commentId)
      
      const hasLiked = !!(fetchedUserLiked && fetchedUserLiked.length > 0)
    
      setUserLiked(prev => ({
        ...prev,
        [commentId]: hasLiked
      }))
    } catch (error) {
      console.error('Error checking star status:', error)
      setUserLiked(prev => ({
        ...prev,
        [commentId]: false
      }))
    }
  }

  const fetchLikes = async (commentId: string) => {
    if (likes[commentId]) return;
    
    try {
      const { data: fetchedLikes, error: fetchError } = await supabase
        .from('likes')
        .select('*')
        .eq('comment_id', commentId)
      
      if (fetchError || !fetchedLikes) {
        return
      }

      const count = fetchedLikes.length;
      console.log(count)
      
      setLikes(prev => ({
        ...prev,
        [commentId]: count
      }))
    } catch (error) {
      throw new Error(error as string)
    }
  }

  const handleLike = async (commentId: string) => {
    const { data: fetchedLike } = await supabase
      .from('likes')
      .select('*')
      .eq('comment_id', commentId)
      .eq('created_by', userIdServer)

    const userAlreadyLikes = fetchedLike && fetchedLike.length > 0
    
    if (userAlreadyLikes) {
      await supabase
        .from('likes')
        .delete()
        .eq('comment_id', commentId)
        .eq('created_by', userIdServer)

      setUserLiked(prev => ({
        ...prev,
        [commentId]: false
      }))

      setLikes(prev => ({
        ...prev,
        [commentId]: Math.max(0, (prev[commentId] || 1) - 1)
      }))
    }
    else {
      await supabase
        .from('likes')
        .insert([
          {
            created_by: userIdServer,
            comment_id: commentId
          }
        ])

      setUserLiked(prev => ({
        ...prev,
        [commentId]: true
      }))

      setLikes(prev => ({
        ...prev,
        [commentId]: (prev[commentId] || 0) + 1
      }))
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
          articles.slice().reverse().map((element: Article) => (
            <Card key={element.id} className="w-58 max-sm:w-72 basis-auto">
              <CardHeader>
                <div className="flex flex-row justify-between gap-4">
                  <div className="flex flex-col">
                    <CardTitle>{element.title}</CardTitle>
                    <CardDescription>{userNames[element.created_by] || 'Loading user...'}</CardDescription>
                  </div>
                  <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                    <AvatarImage alt="@shadcn" />
                    <AvatarFallback>
                      {userNames[element.created_by] 
                        ? userNames[element.created_by].slice(0, 2).toUpperCase() 
                        : "??"}
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
                  
                    <Dialog>

                    <DialogTrigger asChild>
                      <Button type="button" className="flex-1">Access</Button>
                    </DialogTrigger>
                    <DialogTitle hidden className="text-2xl font-bold">Article</DialogTitle>
                    <DialogContent className="h-8/10 flex flex-row !max-w-5xl !w-7xl max-md:flex-col">
                      <div className="border-1 p-12 rounded-lg shadow-md bg-card/90 w-5/10 overflow-y-scroll"
                      dangerouslySetInnerHTML={{ __html: element.content }}>
                      </div>
                      <div className="border-1 p-12 rounded-lg shadow-md bg-card/90 w-5/10 overflow-y-scroll">
                        <div className="flex flex-row items-center justify-between px-4">
                          <h1>Comentários</h1>
                          <Button variant="ghost" onClick={() => handleStar(element.id)} ><Star className={userStarred[element.id] ? "fill-foreground" : ""} />{stars[element.id] || '0'}</Button>
                        </div>
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-4">
                          <form action={postAction} className="flex flex-row gap-2">
                            <Input type="hidden" name="articleId" value={element.id} />
                            <Input type="hidden" name="userId" value={userIdServer} />
                            <Input name="content" id={`comment-input-${element.id}`} placeholder="Write a comment..." className="w-full" />
                            <Button onClick={() => {
                              const inputElement = document.getElementById(`comment-input-${element.id}`) as HTMLInputElement;
                              if (inputElement && inputElement.value.trim() !== "") {
                                const newCommentary: Commentary = {
                                  id: crypto.randomUUID(),
                                  created_at: new Date(),
                                  article_id: element.id,
                                  created_by: userIdServer,
                                  content: inputElement.value
                                }
                                setCommentaries(prev => ({
                                  ...prev,
                                  [element.id]: [...(prev[element.id] || []), newCommentary]
                                }))
                              }
                            }} size="icon" type="submit"><Rocket /></Button>
                          </form>
                          {commentaries[element.id]?.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full">
                              <p className="text-sm text-muted-foreground">No comments yet</p>
                              </div>
                              ) : commentaries[element.id]?.slice().reverse().map((commentary: Commentary) => (
                                <Card key={commentary.id} className="bg-muted/50">
                                <CardHeader className="flex flex-row justify-between">
                                  <div className="flex flex-row gap-3">
                                    <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                                    <AvatarImage alt="@shadcn" />
                                    <AvatarFallback>
                                      {userNames[commentary.created_by] 
                                        ? userNames[commentary.created_by].slice(0, 2).toUpperCase() 
                                        : "??"}
                                    </AvatarFallback>
                                    </Avatar>
                                    <div>
                                      <CardTitle>{userNames[commentary.created_by]}</CardTitle>
                                      <CardDescription>{commentary.created_at ? new Date(commentary.created_at).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'short', 
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                      }) : 'Just now'}</CardDescription>
                                    </div>
                                  </div>
                                  <Button variant="ghost" onClick={() => handleLike(commentary.id)} className="hover:scale-110 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                                    <Heart className={userLiked[commentary.id] ? "fill-foreground" : ""} />{likes[commentary.id] || '0'}
                                  </Button>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-5 justify-between h-full">
                                  <div>
                                    <p className="text-sm leading-relaxed">
                                      {commentary.content}
                                    </p>
                                  </div>
                                </CardContent>
                              </Card>      
                            ))}
                        </div>
                      </div>
                    </DialogContent>
                    </Dialog>
                  {/* <Button variant={"outline"} className="flex-1">Download</Button> */}
                  <div className="flex justify-between border-1 rounded-lg">
                    <Button variant="ghost" onClick={() => handleStar(element.id)} ><Star className={userStarred[element.id] ? "fill-foreground" : ""} />{stars[element.id] || '0'}</Button>
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