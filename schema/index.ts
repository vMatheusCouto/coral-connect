import * as z from 'zod'

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email adress."
    })
})

export const ArticleSchema = z.object({
    name: z.string().email({
        message: "Please enter a valid email adress."
    })
})