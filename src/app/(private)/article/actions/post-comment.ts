'use server'

import { supabase } from "@/app/utils/supabase";
import { redirect } from "next/navigation";


export async function postcomment(prevState: any, formData: FormData) {

  const dataTo = Object.fromEntries(formData)
  
    const { data, error } = await supabase
      .from("commentaries")
      .insert([
        {
          created_by: dataTo.userId,
          article_id: dataTo.articleId,
          content: dataTo.content
        },
      ])
      .select();

      console.log(data)
    if (error) {
        console.log(error)
      throw new Error(error.message);
    }
  }
  