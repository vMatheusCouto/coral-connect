'use client'

import { useActionState } from 'react'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CardWrapper from './card-wrapper'
import { Label } from '@/components/ui/label'
import { useFormStatus } from 'react-dom'
import { signin } from '../lib/auth'


export default function RegisterForm() {
  const [state, loginAction] = useActionState(signin, undefined)

  return (
    <CardWrapper
      label="Create an account"
      title="Login"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
    >
        <form action={loginAction} className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email" className={state?.errors && 'password' in state.errors ? "text-destructive" : undefined}>Email</Label>
            <Input name="email" type="email" aria-invalid={state?.errors && 'password' in state.errors} id="email" placeholder="Email" />
          </div>
          {state?.errors && 'email' in state.errors && (
            <Label className="text-destructive -mt-2">{state.errors.email?.[0]}</Label>
          )}

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password" className={state?.errors && 'password' in state.errors ? "text-destructive" : undefined}>Password</Label>
            <Input name="password" type="password" aria-invalid={state?.errors && 'password' in state.errors} id="password" placeholder="*******" />
          </div>
          {state?.errors && 'password' in state.errors && (
            <Label className="text-destructive -mt-2">{state.errors.password?.[0]}</Label>
          )}

          {state?.errors && 'errorMessage' in state.errors && (
            <Label className="text-destructive -mb-2 text-center">{(state.errors as { errorMessage: { message: string } }).errorMessage.message}</Label>
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