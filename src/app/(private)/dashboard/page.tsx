import React from 'react'
import { getSession } from '@/lib/session'
import ListPage from './sections/list'

export default async function Page() {
  const session = await getSession()
  const userId = session?.userId as string

  return (
    <ListPage userIdServer={userId} />
  )
}
