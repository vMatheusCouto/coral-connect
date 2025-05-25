'use client'

import { useForm } from "react-hook-form";
import TextEditor from "./text-editor/editor";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { postarticle } from "@/app/(private)/article/creation/postArticle";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.any(),
  desc: z.any(),
  post: z.any(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ArticleWriter() {
    const [content, setContent] = useState<string>("");

    const form = useForm<FormValues>({
        mode: "onTouched",
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            desc: "",
            post: "",
        }
    });

    const onSubmit = (data: FormValues) => {
        console.log(data.post);
        
        toast("Article created", {
            description: new Date().toString()
          })
        postarticle({title: data.title, desc: data.desc, post: data.post})
        /* setContent(data.post) */
        
    };

  return (
    <div className="w-full flex flex-col items-center justify-center gap-4 px-40 py-16">
        <div className="border-1 p-12 rounded-lg shadow-md bg-card/90">

        <h1 className="text-3xl mb-8">Create a new article</h1>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
            
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input {...field} required id="title" placeholder="Insert the title here..." className="h-12" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="desc"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input {...field} required id="desc" placeholder="Insert the description here..." className="h-12" />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="post"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Article</FormLabel>
                            <FormControl>
                                <TextEditor 
                                    content={field.value} 
                                    onChange={(value) => field.onChange(value)} 
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="mt-4">Submit</Button>
            </form>
        </Form>
        </div>
        {/* <div className="border-1 p-12 rounded-lg shadow-md bg-card/90 w-full"
        dangerouslySetInnerHTML={{ __html: content }}>
        </div> */}
    </div>
  )
}
/* 
function TextContent(content: object) {
    return (
        
    )
} */