"use client"

import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormDescription } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import CardWrapper from "./card-wrapper"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { login } from "@/app/lib/auth"
import { LoginSchema } from "@/app/lib/definitions" // Use your actual login schema here

const LoginForm = () => {
  const [loading, setLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const onSubmit = async (values: any) => {
    setLoading(true)
    try {
      const response = await login(values)
      console.log("Login successful:", response)
      // Do something, like redirecting the user, after successful login
    } catch (error) {
      console.error("Login error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CardWrapper 
      label="Sign in to your account"
      title="Login"
      backButtonHref="/auth/register"
      backButtonLabel="Don't have an account? Register."
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="email" />
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
                    <Input {...field} type="password" placeholder="password" />
                  </FormControl>
                  <FormDescription className="text-right">Forgot password?</FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full cursor-pointer mt-6" 
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default LoginForm