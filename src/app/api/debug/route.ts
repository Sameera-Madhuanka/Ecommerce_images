import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        password: true
      }
    })

    const testPassword = 'sameera123'
    const hashedPassword = await bcrypt.hash(testPassword, 10)
    const isValid = await bcrypt.compare(testPassword, hashedPassword)

    return NextResponse.json({
      users,
      testHash: hashedPassword,
      testCompare: isValid
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
  }
}
