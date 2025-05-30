import { supabase } from "@/utils/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest, { params }: {
    params: { userId: string}
}) {
    console.log('Fetching user with ID:', params.userId);
    try {
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', params.userId)

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ response });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}