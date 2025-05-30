import { z } from 'zod'
 
export const RegisterSchema = z.object({
  name: z
    .string()
    .nonempty({ message: 'Name is required.' })
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: z.string().nonempty({ message: "Email is required."}).email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .nonempty({ message: "Password is required."})
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
    confirmPassword: z
    .string()
    .nonempty({ message: "Password confirmation is required."})
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
.refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
});

export const LoginSchema = z.object({
  email: z.string().nonempty({ message: "Email is required."}).email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .nonempty({ message: "Password is required."})
})
 
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined
