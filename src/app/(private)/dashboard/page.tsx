import React from 'react'
import ListPage from './list'
import { getSession } from '@/app/lib/session'

export default async function Page() {
  const session = await getSession()
  const userId = session?.userId

  return (
    <ListPage userIdServer={userId} />
  )
}
