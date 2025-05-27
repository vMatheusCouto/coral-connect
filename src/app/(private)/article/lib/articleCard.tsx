import { Article } from '@/app/api/services/article';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Dialog, DialogTrigger, DialogTitle, DialogContent } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Star, Rocket, Heart } from 'lucide-react';
import React, { useState } from 'react'

interface Commentary {
  id: string;
  created_at: Date;
  article_id: string;
  created_by: string;
  content: string;
}

interface ArticleCardProps {
  articles: Article[];
  loading: boolean;
  userNames: Record<string, string>;
  userIdServer: string;
  postAction: (formData: FormData) => void;
  stars: Record<string, number>;
  likes: Record<string, number>;
  userStarred: Record<string, boolean>;
  userLiked: Record<string, boolean>;
  handleStar: (id: string) => void;
  handleLike: (id: string) => void;
}

export default function ArticleCard({
  articles,
  loading: isLoading,
  userNames,
  userIdServer,
  postAction,
  stars,
  likes,
  userStarred,
  userLiked,
  handleStar,
  handleLike
}: ArticleCardProps) {
  const [commentaries, setCommentaries] = useState<Record<string, Commentary[]>>({});

  return (
    <div>
      {isLoading ? (
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
                                <Input hidden name="articleId" value={element.id} />
                                <Input hidden name="userId" value={userIdServer} />
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
                  </CardContent>
                </Card>
              ))
            }
      </div>
    </div>
  );
}
}
