import { getSession } from "@/lib/session";
import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await getSession()
        const user = await getSession()
    
        const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', user?.userId)
        .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ data })
 } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}