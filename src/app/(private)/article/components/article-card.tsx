import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import React from 'react'
import { Article } from '../types'
import { StarButton } from './card-buttons'
import { DialogComments } from './comment-section'

interface ArticleCardProps {
    element: Article,
    setArticles: Function,
    articles: Article[],
    userIdServer: string,
    size: string,
}

export default function ArticleCard({ element, setArticles, articles, userIdServer, size }: ArticleCardProps) {
    console.log(size)
  return (
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
                    {element.created_by_name 
                        ? element.created_by_name.slice(0, 2).toUpperCase() 
                        : "??"
                    }
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
                    <DialogComments
                        element={element}
                        setArticles={setArticles}
                        articles={articles}
                        userIdServer={userIdServer}
                    />
                    <StarButton 
                        element={element}
                        setArticles={setArticles}
                        articles={articles}
                        userIdServer={userIdServer}
                    />
                </div>
            </div>
            </CardContent>
        </Card>
  )
}