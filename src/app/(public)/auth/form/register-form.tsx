'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import CardWrapper from '../components/card-wrapper'
import { Label } from '@/components/ui/label'
import { useFormStatus } from 'react-dom'
import { signup } from '../../../../lib/auth'
import { useActionState } from 'react'

interface RegisterFormProps {
  type: boolean
  setType: Function
}

export default function RegisterForm({ type, setType }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [state, submitAction] = useActionState(signup, undefined)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <CardWrapper
      label="Create an account"
      title="Register"
      backButtonHref="/auth/login"
      backButtonLabel="Already have an account? Login here."
      type={type}
      setType={setType}
    >
      <form action={submitAction} className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        {state?.errors && 'name' in state.errors && (
          <Label className="text-destructive -mt-2">
            {state.errors.name?.[0]}
          </Label>
        )}

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        {state?.errors && 'email' in state.errors && (
          <Label className="text-destructive -mt-2">
            {state.errors.email?.[0]}
          </Label>
        )}

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            required
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {state?.errors && 'password' in state.errors && (
          <Label className="text-destructive -mt-2">
            {state.errors.password?.[0]}
          </Label>
        )}

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="********"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {state?.errors && 'confirmPassword' in state.errors && (
          <Label className="text-destructive -mt-2">
            {state.errors.confirmPassword?.[0]}
          </Label>
        )}

        {state?.errors && 'finalError' in state.errors && (
          <Label className="text-destructive -mt-2">
            {state.errors.finalError?.[0]}
          </Label>
        )}

        <SubmitButton />
      </form>
    </CardWrapper>
  )
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full mt-6" disabled={pending}>
      {pending ? 'Loading...' : 'Submit'}
    </Button>
  )
}