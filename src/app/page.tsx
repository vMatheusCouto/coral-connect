'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightCircleIcon, CircleParking, CirclePower, DiamondIcon, PencilIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Page() {

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-12 py-8 fixed top-0 w-screen">
        <h1>Coral Connect</h1>
        <div className="flex flex-row gap-4">
            <a href="#">Home</a>
            <a href="#about">About</a>
            <a href="#contact">Contact us</a>
        </div>
        <Button className="bg-foreground rounded-full text-background hover:bg-muted-foreground cursor-pointer">Acess now</Button>
      </header>
      <main className="bg-foreground">
        <section id="home" className="h-screen bg-background rounded-b-2xl flex items-center p-12">
          <div className="flex flex-col ml-24 gap-4">
            <h1 className="text-5xl font-bold text-left">
              Join the fight to<br />
              <span className="text-primary">Protect Coral Reefs</span><br /> 
              from silent extinction.<br />
            </h1>
            <p className="text-wrap max-w-100">
              Explore the latest research, connect with scientists and voices of the ocean every article brings us closer to change.
            </p>
            <Link href="auth/acess">
              <Button className="bg-foreground rounded-full text-background hover:bg-muted-foreground cursor-pointer max-w-30 p-2"><ArrowRightCircleIcon /> Start now</Button>
            </Link>
          </div>
        </section>
        <section id="about" className="h-screen bg-foreground flex flex-col items-center justify-center w-screen gap-4">
          <h2 className="text-primary text-3xl font-bold">Our Services</h2>
          <h1 className="text-background text-6xl font-black">Our Service</h1>
          <div className="grid max-w-7/10 grid-cols-3 auto-cols-[minmax(0,3fr)] gap-8">
          {Array.from({length: 6}).map((_, i) => {
            return (
              <Card key={i} className="bg-background flex rounded-3xl items-center justify-center max-w-90 h-60">
                <CardHeader className="flex-1 w-full">
                  <div className="w-14 h-14 rounded-full bg-foreground flex items-center justify-center p-4">
                    <PencilIcon color="black"/>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardTitle>Research Submission</CardTitle>
                  <CardDescription>Submit your coral bleaching studies and help expand global scientific knowledge on reef conservation efforts.</CardDescription>
                </CardContent>
              </Card>
            )}
          )}
          </div>
        </section>
        <section id="contact" className="h-screen bg-background"></section>
      </main>
      <footer></footer>
    </div>
  )
}