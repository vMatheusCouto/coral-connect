'use server'

import { getSession } from "@/app/lib/session";
import { supabase } from "@/app/utils/supabase";
import { redirect } from "next/navigation";

interface PostArticleProps {
  title: string;
  desc: string;
  post: string;
}


export async function postarticle({ title, desc, post }: PostArticleProps) {
    const user = await getSession()
  
    await supabase
      .from("articles")
      .insert([
        {
          created_by: user?.userId,
          title: title,
          description: desc,
          content: post
        },
      ])
      .select();

      redirect('/article')
  }
  