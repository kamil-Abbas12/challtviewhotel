// app/api/contact/route.js
import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Contact from '@/models/Contact'

export async function POST(req) {
  try {
    const body = await req.json()
    const { name, phone, email, message } = body

    await dbConnect()

    const contact = new Contact({ name, phone, email, message })
    await contact.save()

    return NextResponse.json({ message: 'Message saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Error saving contact message:', error)
    return NextResponse.json({ message: 'Failed to save message' }, { status: 500 })
  }
}
