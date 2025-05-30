'use server'

import { redirect } from "next/navigation";
import { z } from "zod";
import { supabase } from "@/utils/supabase";

import { getSession } from "@/lib/session";

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
