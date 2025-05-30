'use server'

import { AppSidebar } from "@/components/organisms/app-sidebar";
import { Header } from "@/components/organisms/header";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "../../lib/session";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 

{
  const session = await getSession()
  const userId: string = session?.userId as string || ''

  return (
    <div className="scroll-smooth">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <Header userId={userId}/>
          {children}
          <ModeToggle />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
