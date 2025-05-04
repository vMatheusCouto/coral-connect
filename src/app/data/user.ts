import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint"
import { verifySession } from "../lib/session"
import { supabase } from "../utils/supabase"
import { cache } from "react"

export const getUser = cache(async () => {
    const session = await verifySession()

    const { data, error } = await supabase
    .from("auth-users")
    .select("*")
    .eq("id", session.userId)
    
    const user = data?.[0]

    const filteredUser = userDTO(user)
    
    return filteredUser
})

function userDTO(user) {
    taintUniqueValue(
        'Do not pass a user session token to the client.',
        user,
        user.session.token
    )
    
    return {
        name: user.name,
        email: user.email,
        session: user.session,
        auditTrail: canViewAudit(user.auditTrail, user.role),
    }
}

function canViewAudit(auditTrail, role) {
    return role === 'admin' ? auditTrail: null
}   