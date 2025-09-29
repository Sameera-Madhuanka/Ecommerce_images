import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const categories = await prisma.category.findMany()
  return NextResponse.json(categories)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, description } = body

  if (!name) {
    return NextResponse.json({ error: 'Name is required' }, { status: 400 })
  }

  const category = await prisma.category.create({
    data: { name, description }
  })

  return NextResponse.json(category)
}
