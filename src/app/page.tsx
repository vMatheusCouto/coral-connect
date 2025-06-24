'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightCircleIcon, PencilIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"


import { Roboto, Roboto_Serif } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin"],
});

const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
});

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
        <Link href="/auth">
          <Button className="bg-foreground rounded-full text-background hover:bg-muted-foreground cursor-pointer">Acess now</Button>
        </Link>
      </header>
      <main className="bg-foreground">

        {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
         */}
      <section id="home" className="h-screen  bg-radial-[at_75%_50%] from-[#3a3e3e] via-[#1a1b1b] to-[#161616] to-90% rounded-b-2xl flex items-center p-12">
        <Image
        alt="Coral Connect Background"
         src="https://i.ibb.co/KjRwH6H2/background.png"
         width={5519}
          height={2532}
          className="absolute left-0 right-0 bottom-0 h-8/10 top-41 rounded-2xl "
        />
          <div className="flex flex-col ml-24 -mt-24 gap-4 z-10">
            <h1 className={`${robotoSerif.className} text-5xl font-semibold text-left`}>
              Join the fight to<br />
              <span className="text-[#64CCC5]">Protect Coral Reefs</span><br />
              from silent extinction.<br />
            </h1>
            <p className="text-wrap max-w-120">
              Explore the latest research, connect with scientists and voices of the ocean every article brings us closer to change.
            </p>
            <Link href="auth">
              <Button className="bg-foreground rounded-full text-background hover:bg-zinc-300 cursor-pointer max-w-30 p-2"><ArrowRightCircleIcon /> Start now</Button>
            </Link>
          </div>
          <div className="absolute flex items-center justify-center right-40 w-110 h-110 bg-none border-1 border-[#64CCC5] rounded-full">
            <div className=" right-40 w-80 h-80 bg-none border-1 border-[#454b4b] rounded-full" />
          </div>
          <div className="absolute mask-radial-at-center mask-radial-from-20% mask-radial-[50%_50%] scale-200 flex items-center justify-center right-40 w-110 h-110 bg-none bg-[#64CCC5] rounded-full opacity-10">

          </div>
          <div className="absolute flex items-center justify-center right-40 scale-300 w-110 h-110 bg-none rounded-full">
          <Image
              alt="Coral Connect aaLogo"
              src="https://i.ibb.co/4w83qJcF/Design-sem-nome-2.png"
              width={1500}
              height={1500}
              />
          </div>
        </section>
        <section id="about" className="h-screen bg-foreground flex flex-col items-center justify-center w-screen gap-4">
          <h2 className={`${robotoSerif.className} text-[#64CCC5] text-3xl font-bold -mb-6 text-center`}>Our Platform</h2>
          <h1 className={`${robotoSerif.className} text-background text-6xl font-bold text-wrap max-w-2xl text-center`}>Scientific tools for
          coral reef awareness</h1>
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
                  <CardTitle className={robotoSerif.className}>Research Submission</CardTitle>
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
