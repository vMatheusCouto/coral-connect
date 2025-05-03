"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from '@/components/ui/form'
import { RegisterSchema } from "@/app/lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import CardWrapper from "./card-wrapper"
import { useFormStatus } from "react-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const LoginForm = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = () => {
        setLoading(true)
        console.log("submitted")
    }

    const { pending } = useFormStatus()
    return (
        <CardWrapper 
            label="Sign in to your account"
            title="Login"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an acccount? Register."
        >
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="flex flex-col gap-4">
                        <FormField          
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="">Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="email"/>
                                </FormControl>
                            </FormItem>
                        )}
                        />

                        <FormField          
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="password"/>
                                </FormControl>
                                <FormDescription className="text-right">Forgot password?</FormDescription>
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer mt-6" disabled={pending}>{loading ? "Loading..." : "Login"}</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm