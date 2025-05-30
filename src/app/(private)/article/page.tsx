'use server'

import { Suspense } from "react"
import ListPage from "./sections/content"
import { getSession } from "@/lib/session"
import Loading from "./loading"

export default async function Page() {
  const session = await getSession()
  const userIdServer = session?.userId as string

  return (
    <div>
      <main className="px-3">
        <ListPage userIdServer={userIdServer}/>
      </main>
    </div>
  )
}