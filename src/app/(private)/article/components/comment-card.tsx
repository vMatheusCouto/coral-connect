import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import React from 'react'
import { LikeButton } from './card-buttons'
import { Article } from '../types'

interface CardCommentsProps {
    commentary: any,
    setArticles: Function,
    articles: Article[],
    userIdServer: string,
}

export default function CommentCard({ commentary, setArticles, articles, userIdServer }: CardCommentsProps) {
  return (
    <Card key={commentary.id} className="bg-muted/50">
        <CardHeader className="flex flex-row justify-between">
            <div className="flex flex-row gap-3">
            <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                <AvatarImage alt="@shadcn" />
                <AvatarFallback>
                {
                    commentary.created_by_name
                    ? commentary.created_by_name.slice(0, 2).toUpperCase()
                    : "??"
                }
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
  )
}
