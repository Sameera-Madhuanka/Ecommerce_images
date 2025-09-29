import { NextResponse, NextRequest } from 'next/server'

import { prisma } from '@/lib/prisma'


export async function GET() {
  try {
    const shippingMethods = await prisma.shippingMethod.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })
    return NextResponse.json(shippingMethods)
  } catch (error) {
    console.error('[SHIPPING_METHODS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, minWeight, maxWeight, cost, isActive } = body

    if (!name || minWeight === undefined || cost === undefined) {
      return new NextResponse('Name, minWeight, and cost are required', { status: 400 })
    }

    const shippingMethod = await prisma.shippingMethod.create({
      data: {
        name,
        minWeight,
        maxWeight,
        cost,
        isActive,
      },
    })

    return NextResponse.json(shippingMethod, { status: 201 })
  } catch (error) {
    console.error('[SHIPPING_METHODS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
