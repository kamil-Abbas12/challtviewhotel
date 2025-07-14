import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { getUserByEmail, createUser } from '@/lib/db'

export async function POST(req) {
  try {
    const { email, password } = await req.json()

    // 1. Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists.' }, { status: 400 })
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 12)

    // 3. Create the user
    await createUser({
      email,
      password: hashedPassword,
      provider: 'credentials',
      createdAt: new Date(),
    })

    return NextResponse.json({ message: 'User created successfully!' }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 })
  }
}
