import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Filter, PlusCircle } from 'lucide-react'
import React from 'react'
import { ArticleList } from '../../../../components/organisms/article-list'
import Link from 'next/link'

export default async function ListPage({ userIdServer }: { userIdServer: string }) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-8">
        <div className="flex flex-row justify-between items-center px-4 max-md:flex-col">
        <h1 className="text-4xl font-bold mb-5">All articles</h1>
        <div className="flex flex-row gap-2">
            <Button variant="outline" >
            <Filter />
            Filter
            </Button>
            <Link href="/article/create">
            <Button>
                <PlusCircle />
                Add new article
            </Button>
            </Link>
        </div>
        </div>

        <Separator className="my-4 md:hidden" />
        <ArticleList variant='grid' userIdServer={userIdServer}/>
    </div>
  )
}
