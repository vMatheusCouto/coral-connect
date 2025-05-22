'use server'

import { getSession } from "@/app/lib/session";
import { supabase } from "@/app/utils/supabase";

export async function postarticle(prevState: any, formData: FormData) {
    const { title, desc } = Object.fromEntries(formData.entries())
  
    const user = await getSession()
  
    const { data, error } = await supabase
      .from("articles")
      .insert([
        {
          created_by: user.userId,
          title: title,
          description: desc,
        },
      ])
      .select();

      console.log(data)
    if (error) {
        console.log(error)
      throw new Error(error.message);
    }
  }
  