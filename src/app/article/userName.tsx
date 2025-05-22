import { supabase } from "../utils/supabase";

export async function getUserName(userId: any) {
    const { data: fetchedUser, error: fetchError } = await supabase
        .from('auth-users')
        .select('*')
        .eq('id', userId)
        .single()
    return fetchedUser.name
}