'use server'

import ListPage from "./content"
import { getSession } from "@/app/lib/session"

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