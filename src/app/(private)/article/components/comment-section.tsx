import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Star, Rocket, Heart, Focus, MessageCircle } from 'lucide-react';
import React, { useActionState, useState } from 'react'
import { Article } from '../types';
import { postcomment } from '../actions/post-comment';
import { toggleStar } from '../actions/toggle-star';
import { LikeButton } from './card-buttons';

interface DialogCommentsProps {
    element: Article,
    setArticles: Function,
    articles: Article[],
    userIdServer: string,
}

export function DialogComments({ element, setArticles, articles, userIdServer }: DialogCommentsProps) {
    const [state, postAction] = useActionState(postcomment, undefined)
    const [focus, setFocus] = useState(false);
    
  return (
    <Dialog>
    
    <DialogTrigger asChild>
        <Button type="button" className="flex-1">Access</Button>
    </DialogTrigger>
    <DialogTitle hidden className="text-2xl font-bold">Article</DialogTitle>
    <DialogContent className="h-8/10 flex flex-row !max-w-5xl !w-7xl max-md:flex-col">
        <div className={`border-1 rounded-lg shadow-md bg-card/90 ${focus ? "w-full" : "w-5/10"} overflow-y-scroll flex flex-col transition-all duration-500 ease-in-out`}>
        
            <div className='flex flex-1 w-full justify-between align-center gap-4'>
                <p className='pl-4 pt-1'>{element.title}</p>
                <Button variant="ghost" onClick={() => setFocus(!focus)}>
                    {focus ? 
                        (<>Comments <MessageCircle className='top-4 right-4'/></>) : 
                        (<>Focus <Focus className='top-4 right-4'/></>)}
                </Button>
            </div>    
            <div className='p-12 overflow-y-scroll' dangerouslySetInnerHTML={{ __html: element.content }}></div>
        </div>
        <div className={` ${focus ? "hidden" : ""} border-1 p-12 rounded-lg shadow-md bg-card/90 w-5/10 overflow-y-scroll`}>
        <div className="flex flex-row items-center justify-between px-4">
            <h1>Comentários</h1>
            <Button variant="ghost" onClick={() => toggleStar(element, setArticles, articles, userIdServer)}><Star className={element.userStarred ? "fill-foreground" : ""}/>{element.stars}</Button>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-col gap-4">
            <form action={postAction} className="flex flex-row gap-2">
            <Input hidden name="articleId" value={element.id} readOnly/>
            <Input hidden name="userId" value={userIdServer} readOnly/>
            <Input name="content" id={`comment-input-${element.id}`} placeholder="Write a comment..." className="w-full" />
            <Button size="icon" type="submit"><Rocket /></Button>
            </form>
            {element.comments.count === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
                <p className="text-sm text-muted-foreground">No comments yet</p>
                </div>
                ) : element.comments.items?.slice().reverse().map((commentary: any) => (
                <Card key={commentary.id} className="bg-muted/50">
                <CardHeader className="flex flex-row justify-between">
                    <div className="flex flex-row gap-3">
                    <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                        <AvatarImage alt="@shadcn" />
                        <AvatarFallback>
                            
                        </AvatarFallback>
                    </Avatar>
                        <div>
                        <CardTitle>{commentary.created_by_name}</CardTitle>
                        <CardDescription>{commentary.created_at ? new Date(commentary.created_at).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                        }) : 'Just now'}</CardDescription>
                    </div>
                    </div>
                    <LikeButton 
                        commentary={commentary}
                        setArticles={setArticles}
                        articles={articles}
                        userIdServer={userIdServer}
                    />
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
  )
}
