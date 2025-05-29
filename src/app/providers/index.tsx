"use client"

import React, {createContext} from "react";
import { getSession } from "../lib/session";

const UserContext = createContext({})

export default function UserProvider({children}: {children: React.ReactNode}) {
return (
<UserContext.Provider value>
 {children}
</UserContext.Provider>
)
}
