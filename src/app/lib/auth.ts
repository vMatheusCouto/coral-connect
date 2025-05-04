'use server'
import { RegisterSchema, FormState } from '@/app/lib/definitions' 
import { eq } from 'drizzle-orm';
import { users } from '@/app/lib/db-schema'; // Adjust the path to your schema
import { deleteSession, createSession } from './session'; // Ensure deleteSession is implemented in session.ts
import { z } from 'zod';

import { NextResponse } from 'next/server'

import { supabase } from "@/app/utils/supabase"
import bcrypt from 'bcryptjs';

export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  const validatedFields = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  }
 
  const { name, email, password } = validatedFields 
  console.log(validatedFields)
  console.log("funcionou")

  if (typeof password !== 'string') {
    throw new Error('Password must be a string');
  }
  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(`Hashed password${hashedPassword}`)

  const { data, error } = await supabase
    .from("auth-users")
    .insert([
      {
        name: name,
        email: email,
        password: hashedPassword,
      },
    ])
    .select();

  if (error) {
    throw new Error(error.message);
  }

  const user = data[0];
  console.log(data)
  console.log(user)

  await createSession(user.id)
  console.log("User created successfully");
}

export async function login(formData: FormData) {
  // 1. Define your schema inside the function
  const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  // 2. Validate the form fields
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  const errorMessage = { message: 'Invalid login credentials.' }

  // If validation fails, return error details
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // 3. Query the database for the user with the given email using Supabase
  const { data: fetchedUser, error: fetchError } = await supabase
    .from('auth-users')
    .select('*')
    .eq('email', validatedFields.data.email)
    .single()

  if (fetchError || !fetchedUser) {
    return errorMessage
  }

  // 4. Compare the provided password with the stored hashed password
  const passwordMatch = await bcrypt.compare(
    validatedFields.data.password,
    fetchedUser.password
  )

  // Delete any existing session
  await deleteSession()

  // If the password does not match, return error message
  if (!passwordMatch) {
    return errorMessage
  }

  // 5. Create a new session for the user
  const userId = fetchedUser.id.toString()
  await createSession(userId)

  // Optionally, you can return the user or some success status
  return { message: 'Login successful', user: fetchedUser }
}

export async function logout() {
  deleteSession();
}
