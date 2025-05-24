'use server'
import { FormState } from '@/app/lib/definitions' 
import { z } from 'zod';

import { supabase } from "@/app/utils/supabase"
import bcrypt from 'bcryptjs';

import { RegisterSchema, LoginSchema } from "@/app/lib/definitions"
import { createSession, deleteSession } from './session';
import { redirect } from 'next/navigation';

export async function signup(prevState: any, formData: FormData) {
  const result = RegisterSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { name, email, password } = result.data 

  if (typeof password !== 'string') {
    throw new Error('Password must be a string');
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(`Hashed password${hashedPassword}`)

  const { data: fetchedUser, error: fetchError } = await supabase
    .from('auth-users')
    .select('*')
    .eq('email', email)
    .single()

  if (fetchedUser) {
    return {
      errors: { finalError: ['Email already registered.'] },
    }
  }

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

  await createSession(data[0].id);
  redirect('/dashboard')
}

export async function signin(prevState: any, formData: FormData) {

  const result = LoginSchema.safeParse(Object.fromEntries(formData))

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data 
  const errorMessage = { message: 'Invalid login credentials.' }

  const { data: fetchedUser, error: fetchError } = await supabase
    .from('auth-users')
    .select('*')
    .eq('email', email)
    .single()

  if (fetchError || !fetchedUser) {
    return { errors: {errorMessage} }
  }

  const passwordMatch = await bcrypt.compare(
    password,
    fetchedUser.password
  )

  if (!passwordMatch) {
    return { errors: {errorMessage} }
  }

  const userId = fetchedUser.id.toString()
  await createSession(userId);

  redirect('/dashboard')
  return { message: 'Login successful', user: fetchedUser }
}

export async function signout() {
  await deleteSession()
  redirect('/auth')
}