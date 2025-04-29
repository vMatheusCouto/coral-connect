"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel} from '@/components/ui/form'
import { RegisterSchema } from "../../../schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import CardWrapper from "./card-wrapper"

const LoginForm = () => {
    const form = useForm({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const onSubmit = () => {
        console.log("submitted")
    }

    return (
        <CardWrapper 
            label="Sign in to your account"
            title="Login"
            backButtonHref="/auth/register"
            backButtonLabel="Doens't have an account yet? Create one here."
        >
            
            <Form {...form}>
                <div className="flex flex-col gap-4">
                    <FormField          
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
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
                        </FormItem>
                    )}
                    />
                </div>

            </Form>
        </CardWrapper>
    )
}

export default LoginForm