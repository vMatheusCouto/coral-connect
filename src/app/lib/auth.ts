'use server'
import { RegisterSchema, FormState } from '@/app/lib/definitions' 

import { NextResponse } from 'next/server'

import { supabase } from "@/app/utils/supabase"
import bcrypt from 'bcryptjs';
import { createSession } from './session';

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
