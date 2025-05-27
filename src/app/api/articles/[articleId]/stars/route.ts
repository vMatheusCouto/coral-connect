import { supabase } from "@/app/utils/supabase";
import { NextRequest, NextResponse } from "next/server";
export async function GET(
    request: NextRequest,
    { params }: { params: { articleId: string } }
) {
    const articleId = params.articleId;
    console.log('Fetching stars for article with ID:', articleId);
    
    try {
        const { data: stars, error: fetchError } = await supabase
            .from('stars')
            .select('*')
            .eq('article_id', articleId)
        
        if (fetchError) {
          return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }
  
        return NextResponse.json({
            count: stars?.length || 0,
            stars,
        })

      } catch (error) {
        throw new Error(error as string)
      }
}

export async function POST(request: NextRequest,
    { params }: { params: { userId: string } }
) {
    try {
        const { articleId } = await request.json()

        const { error: fetchError } = await supabase
            .from('stars')
            .insert([
                {
                    user_id: params.userId,
                    article_id: articleId  
                }
            ])
    
            if (fetchError) {
                return NextResponse.json({ error: fetchError.message }, { status: 500 });
            }

        } catch (error) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
    return NextResponse.json({})
}

export async function DELETE(request: NextRequest,
    { params }: { params: { userId: string }}
) {
    try {
        const { articleId } = await request.json()

        const { error: fetchError } = await supabase
            .from('stars')
            .delete()
            .eq('article_id', articleId)
            .eq('user_id', params.userId)
    
            if (fetchError) {
                return NextResponse.json({ error: fetchError.message }, { status: 500 });
            }

        } catch (error) {
            return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
        }
}
