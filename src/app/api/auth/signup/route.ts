// filepath: /home/matheus/dev/nadic/trilha-front/Part 4/nadic-front/src/app/api/auth/signup/route.ts
import { NextResponse } from 'next/server'
import { supabase } from '@/app/lib/supabaseClient'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    const hashedPassword = await bcrypt.hash(password, 10)
    const { data, error } = await supabase
      .from('users-list')
      .insert([{ name, email, password: hashedPassword }])

    if (error) {
      console.error("Supabase insert error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    console.log("Inserted data:", data)
    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}