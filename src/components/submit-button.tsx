'use client'

import { useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'

export function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" className="w-full mt-6" disabled={pending}>
      {pending ? 'Loading...' : 'Create Account'}
    </Button>
  )
}