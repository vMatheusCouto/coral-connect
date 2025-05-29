'use server'

import { articleService } from "@/app/services/article";

export async function postcomment(prevState: any, formData: FormData) {

  const dataTo = Object.fromEntries(formData)
  await articleService.postComment(dataTo.articleId as string, dataTo.userId as string, dataTo.content as string)
      console.log(dataTo)
}
