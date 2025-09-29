import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const paymentMethods = await prisma.paymentMethod.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(paymentMethods)
  } catch (error) {
    console.error('[PAYMENT_METHODS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, isActive } = body

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const paymentMethod = await prisma.paymentMethod.create({
      data: {
        name,
        isActive,
      },
    })

    return NextResponse.json(paymentMethod, { status: 201 })
  } catch (error) {
    console.error('[PAYMENT_METHODS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
