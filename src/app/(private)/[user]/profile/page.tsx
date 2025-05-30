import { ArticleList } from '@/components/organisms/article-list'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'
import React from 'react'

export default function Profile() {
  return (
    <div>
        <main className="py-12 px-16 flex flex-col gap-12">
            <div className='flex flex-row gap-8'>
                <Avatar className='w-32 h-32'>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="User Avatar"
                    />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className='flex flex-row items-center justify-between flex-1'>
                <div className='flex flex-col'>
                    <h1 className="text-4xl">Matheus Couto</h1>
                    <h2 className='font-light'>@matheusss</h2>
                    <p className="mt-4">This is my bio.</p>
                </div>
                <div>
                    <div>
                        <Button variant="outline" className='rounded-full'>
                            <Rocket />
                            Follow
                        </Button>
                        <p className='font-light '>100 followers</p>
                        <p className='font-light'>157 stars</p>
                    </div>
                </div>
                </div>
                
            </div>
            <div className='flex flex-col gap-4'>
                <h1 className='text-3xl'>Published articles</h1>
                <ArticleList userIdServer="1" variant="grid" />
            </div>
        </main>
    </div>
  )
}
