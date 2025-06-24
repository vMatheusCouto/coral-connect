'use client'
import { ArticleList } from '@/components/organisms/article-list'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { articleService } from '@/services/article'
import { Rocket } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface User {
    id: string,
    created_at: Date,
    name: string,
    email: string,
    password: string,
    username: string | null,
}

export default function Profile() {
    const userId = "30"
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const loadUser = async () => {
            const data = await articleService.getUser(userId)
            console.log('User data fetched:', data[0])
            console.log(data)
            setUser(data)
        }
        loadUser()
    }
    , [userId])

    console.log('User data:', user)

    return (
        <div>
            <main className="py-12 px-16 flex flex-col gap-12">
                <div className='flex flex-row items-center gap-8'>
                    <Avatar className='w-36 h-36'>
                        <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="User Avatar"
                        />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-between flex-1'>
                        <div className='flex flex-row items-start justify-between'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row items-center gap-4'>
                                    <h1 className="text-4xl">{user?.name}</h1>
                                    <Button variant="outline" className='rounded-full'>
                                        <Rocket/>
                                        Follow
                                    </Button>

                                </div>
                                <h2 className='font-light'>@{user?.username || "matheusss"}</h2>
                                <p className="mt-4">This is my bio.</p>
                            </div>

                        </div>
                        <div className='flex flex-row gap-6 mt-4'>
                            <p className='font-light'>100 followers</p>
                            <p className='font-light'>157 stars</p>
                            <p className='font-light'>201 articles</p>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-row items-center justify-between gap-4 w-full'>
                        <h1 className='text-3xl '>Published articles</h1>
                            <Separator className='max-w-14/20'/>
                    </div>
                    <ArticleList userIdServer={userId} variant="grid" />
                </div>
            </main>
        </div>
    )
}
