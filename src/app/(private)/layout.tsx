import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="scroll-smooth">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="overflow-hidden">
          <Header />
          {children}
          <ModeToggle />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
