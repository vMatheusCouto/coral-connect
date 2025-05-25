'use server'

import { getSession } from "@/app/lib/session"
import { ArticleList } from "./lib/list"

export default async function Page() {

  const session = await getSession()
  const userId: string = session?.userId as string || ''

  return (
    <div>
      <main className="px-3">
        <ArticleList userIdServer={userId}/>
      </main>
    </div>
  )
}