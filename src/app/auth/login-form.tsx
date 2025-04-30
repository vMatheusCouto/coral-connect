"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from '@/components/ui/form'
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
            button="Sign in"
            backButtonHref="/auth/register"
            backButtonLabel="Don't have an acccount? Register."
        >
            
            <Form {...form}>
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

            </Form>
        </CardWrapper>
    )
}

export default LoginForm