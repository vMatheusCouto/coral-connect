'use client'

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { LogOut, Search } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { SidebarTrigger } from "./ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { signout } from "@/app/lib/auth";
import { Separator } from "./ui/separator";
import { supabase } from "@/app/utils/supabase";
import { use, useEffect, useState } from "react";

interface HeaderProps {
    userId: string | undefined
}

export function Header({userId}: HeaderProps) {

    const [userName, setUserName] = useState<string | null>(null)

    useEffect(() => {
        const fetchUserName = async () => {
            if (!userId) return;
            try {
                const { data: fetchedUser, error: fetchError } = await supabase
                    .from('auth-users')
                    .select('*')
                    .eq('id', userId)
                    .single()
                
                if (fetchError || !fetchedUser) {
                    return
                }

                setUserName(fetchedUser.name)
                
            } catch (error) {
                throw new Error(error as string)
            }
        }

        fetchUserName()
    }
    , [userId])
    
    return (
        <header className="flex h-16 shrink-0 items-center place-content-between gap-2 border-b px-4 max-w[calc(100% - 256px)]">
            <SidebarTrigger className="-ml-1" />
            <div className="flex flex-row justify-center">
            <Input className="max-w-8/12 rounded-r-none"/>
            <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
                <Search />
            </Button>
            </div>
            <div className="flex flex-row gap-4 align-center justify-center">
                <p className="mt-1">@{userName?.split(' ')[0].toLowerCase()}</p>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar className="hover:scale-108 transition-all duration-500 hover:cursor-pointer hover:opacity-80">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            My content
                        </DropdownMenuItem>

                        <Separator className="my-2"/>

                        <DropdownMenuItem onClick={() => {signout()}}>
                        <LogOut />Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}