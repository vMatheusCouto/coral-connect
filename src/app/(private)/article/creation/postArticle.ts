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
  
    const { data, error } = await supabase
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

      console.log(data)

      redirect('/article')
    if (error) {
        console.log(error)
      throw new Error(error?.message);
    }
  }
  