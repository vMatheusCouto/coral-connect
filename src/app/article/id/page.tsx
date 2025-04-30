'use client'

import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import { useRouter } from "next/navigation"

const articleId = () => {
  const router = useRouter()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="overflow-hidden">
        <header className="flex h-16 shrink-0 items-center place-content-between gap-2 border-b px-4 max-w[calc(100% - 256px)]">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-row justify-center">
            <Input className="max-w-8/12 rounded-r-none"/>
            <Button variant="outline" size="icon" className="rounded-l-none border-l-0">
              <Search />
            </Button>
          </div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </header>
        <main className="p-5 pt-10 px-8">
          <h1 className="text-4xl font-bold">The Silent Collapse: Coral Bleaching and the Urgency for Global Action</h1>
          <h3 className="font-light">Author: Dr. Emily Waters – Marine Biologist, Oceanic Research Institute (ORI), Australia</h3>

          <h2 className="text-2xl font-bold mt-6">Abstract</h2>
          <p className="text-justify mt-2">Coral reefs, often referred to as the "rainforests of the sea," are facing an unprecedented threat in the form of widespread bleaching events. This paper discusses the primary causes behind coral bleaching, its devastating ecological and economic impacts, and the urgent need for coordinated global efforts to reverse the trend. Through a synthesis of recent scientific research and field studies, the work highlights actionable strategies that could foster reef resilience and secure the survival of these critical ecosystems for future generations.</p>

          <h2 className="text-2xl font-bold mt-6">Introduction</h2>
          <p className="text-justify mt-2">Coral reefs represent one of the most biologically diverse ecosystems on the planet, supporting approximately 25% of all marine species despite covering less than 1% of the ocean floor. Beyond their ecological significance, reefs play an essential role in the livelihoods of millions of people, contributing to food security, coastal protection, and global tourism. However, coral reefs are now at a critical juncture. Rising sea surface temperatures, driven by anthropogenic climate change, are causing widespread coral bleaching events that compromise the health and functionality of reef ecosystems. Bleaching occurs when corals, stressed by environmental changes, expel the symbiotic algae (zooxanthellae) that live within their tissues and provide them with energy through photosynthesis. Without these algae, corals lose their vibrant coloration and, more importantly, their primary energy source, making them highly susceptible to disease and mortality.</p>

          <h2 className="text-2xl font-bold mt-6">Causes of Coral Bleaching</h2>
          <p className="text-justify mt-2">The principal catalyst for coral bleaching is the persistent increase in ocean temperatures, a direct consequence of escalating greenhouse gas emissions. Studies have shown that even a 1–2°C rise in water temperature can trigger mass bleaching events. However, temperature is not the sole culprit. Ocean acidification, another byproduct of increased atmospheric CO₂, reduces the availability of calcium carbonate, impairing coral growth and structural integrity. Additionally, localized stressors such as nutrient pollution from agricultural runoff, sedimentation, and chemical contaminants exacerbate coral vulnerability. Overfishing further destabilizes reef ecosystems by removing key species that maintain ecological balance, while irresponsible tourism activities—such as physical damage from anchors, trampling, and sunscreen chemicals—add another layer of stress. These factors, acting individually and synergistically, create a hostile environment for coral survival.</p>

          <h2 className="text-2xl font-bold mt-6">Consequences of Coral Decline</h2>
          <p className="text-justify mt-2">The degradation of coral reefs has profound implications that extend far beyond marine biodiversity. As biodiversity hotspots, reefs host countless species that depend on their complex structures for shelter, breeding grounds, and feeding opportunities. The collapse of these ecosystems could trigger cascading effects throughout the marine food web, leading to widespread loss of marine life. Economically, the damage to coral reefs threatens industries worth billions of dollars annually, particularly in developing countries that rely heavily on fisheries and tourism. Moreover, reefs serve as natural barriers that protect coastal communities from storm surges, erosion, and rising sea levels. Their disappearance would leave millions more vulnerable to the impacts of climate change, amplifying existing social and economic inequalities.</p>

          <h2 className="text-2xl font-bold mt-6">Urgent Actions Needed</h2>
          <p className="text-justify mt-2">Addressing coral bleaching requires a multifaceted, globally coordinated approach. The foremost priority is the mitigation of climate change through significant reductions in greenhouse gas emissions. International agreements, such as the Paris Climate Accord, must be fully implemented and strengthened to limit global warming to 1.5°C above pre-industrial levels. In parallel, local conservation efforts play a crucial role. Establishing and expanding marine protected areas (MPAs), promoting sustainable fishing practices, and investing in coral restoration projects can enhance reef resilience. Innovative solutions such as assisted evolution—where scientists selectively breed corals for heat resistance—also offer promising avenues for preserving reef ecosystems. Public education and community involvement are equally important; fostering a sense of stewardship among local populations and global citizens can drive behavioral changes that benefit reef conservation efforts.</p>

          <h2 className="text-2xl font-bold mt-6">Conclusion</h2>
          <p className="text-justify mt-2">The silent collapse of coral reefs is a stark warning of the broader ecological crises facing our planet. The loss of these ecosystems would not only signify the extinction of countless marine species but would also undermine the well-being of human societies that depend on them. Immediate, sustained, and collective action is imperative to halt and reverse the trajectory of coral decline. Saving the world's coral reefs is not merely a scientific or environmental endeavor; it is an ethical obligation to preserve the intricate, interconnected life systems of our planet for future generations.</p>
          
          <Button type="button" onClick={() => router.push('/')} variant={'outline'} className="m-6">
            Voltar ao início
          </Button>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default articleId