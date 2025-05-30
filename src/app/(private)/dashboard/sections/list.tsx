'use client'

import React from "react"
import { ArticleList } from "../../../../components/organisms/article-list"

export default function ListPage({userIdServer}: {userIdServer: string}) {
  const titles = [
    "Featured Articles",
    "Recent Articles",
    "Most Viewed",
    "Trending Articles"]
  return (
    <div>
      <main className="p-8 flex flex-col gap-12">
        {titles.map((title, index) => (
          <section key={index} className="flex flex-col gap-4">
            <h1 className="ml-8 text-4xl">{title}</h1>
            <ArticleList userIdServer={userIdServer} variant="row"/>
          </section>
        ))}
      </main>
    </div>
  )
}