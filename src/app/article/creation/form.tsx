"use client"

import { Button } from "@/components/ui/button"
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { postarticle } from "./postArticle"
import { useActionState } from "react"

export function ArticleForm() {
    const [state, postAction] = useActionState(postarticle, undefined)
  
  return (
    <>
    <form action={postAction} className="grid gap-4 py-4">
      <DialogHeader>
        <DialogTitle>Share Article</DialogTitle>
        <DialogDescription>
          Insert the article info here.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>
          <Input required name="title" id="title" placeholder="Insert the title here..." className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="desc" className="text-right">
            Description
          </Label>
          <Textarea required id="desc" name="desc" placeholder="Insert the description here..." className="col-span-3 resize-none" />
        </div>
        {/* <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="file" className="text-right">
            File
          </Label>
          <Input type="file" name="file" id="file" className="col-span-3 hover:opacity-80 hover:cursor-pointer" />
        </div> */}
      </div>
      <DialogFooter>
        <Button type="submit">Submit</Button>
      </DialogFooter>
      </form>
    </>
  )
}
