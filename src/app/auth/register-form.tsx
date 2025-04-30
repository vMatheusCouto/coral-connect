"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { RegisterSchema } from "../../../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import CardWrapper from "./card-wrapper"
import { Button } from "@/components/ui/button"
import { useFormStatus } from "react-dom"
import { useState } from "react"

import { signup } from '@/app/actions/auth'

const RegisterForm = () => {
    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirmPassword: ""
        }
    })

    const onSubmit = () => {
        setLoading(true)
        console.log("submitted")
    }

    const { pending } = useFormStatus()
    return (
        <CardWrapper 
            label="Create an account"
            title="Register"
            backButtonHref="/auth/login"
            backButtonLabel="Already have an account? Login here."
        >
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} action={signup}>
                    <div className="flex flex-col gap-4">
                    
                        <FormField 
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input {...field} type="name" placeholder="name"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField          
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input {...field} type="email" placeholder="coralconnect@email.com"/>
                                </FormControl>
                                <FormMessage />
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
                                    <Input {...field} type="password" placeholder="********"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />

                        <FormField          
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm password</FormLabel>
                                <FormControl>
                                    <Input {...field} type="password" placeholder="********"/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                        />
                    </div>
                    <Button type="submit" className="w-full cursor-pointer mt-10" disabled={pending}>{loading ? "Loading..." : "Create Account"}</Button>
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm