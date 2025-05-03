'use server'
import { RegisterSchema, FormState } from '@/app/lib/definitions' 

import axios from 'axios';
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

  const hashedPassword = await bcrypt.hash(password, 10)
  console.log(`Hashed password${hashedPassword}`)
  // Call the provider or db to create a user...
}