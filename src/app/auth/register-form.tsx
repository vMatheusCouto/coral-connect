'use client'

import { useActionState, useState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CardWrapper from './card-wrapper'
import { Label } from '@/components/ui/label'
import { login } from '../lib/definitions'
import { useFormStatus } from 'react-dom'
import { signup } from '../lib/auth'

export default function RegisterForm() {
  const [state, loginAction] = useActionState(signup, undefined)

  const [isLoading, setIsLoading] = useState(false)

  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
        <form action={loginAction} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="name">Name</Label>
            <Input type="text" name="name" id="name" placeholder="Name" required />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input type="email" name="email" id="email" placeholder="Email" required />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" placeholder="********" required />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input type="password" name="confirmPassword" id="confirmPassword" placeholder="********" required />
          </div>

          {state?.errors && 'finalError' in state.errors && (
            <Label className="text-destructive -mt-2">{state.errors.finalError?.[0]}</Label>
          )}
          <SubmitButton />
        </form>
    </CardWrapper>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="w-full mt-6" disabled={pending}>
      {pending ? "Loading..." : "Submit"}
    </Button>
  )
}