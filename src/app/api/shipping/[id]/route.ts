import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

interface Params {
  params: {
    id: string
  }
}

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = params
    const shippingMethod = await prisma.shippingMethod.findUnique({
      where: { id },
    })

    if (!shippingMethod) {
      return new NextResponse('Shipping method not found', { status: 404 })
    }

    return NextResponse.json(shippingMethod)
  } catch (error) {
    console.error('[SHIPPING_METHOD_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = params
    const body = await req.json()
    const { name, minWeight, maxWeight, cost, isActive } = body

    if (!name || minWeight === undefined || cost === undefined) {
      return new NextResponse('Name, minWeight, and cost are required', { status: 400 })
    }

    const shippingMethod = await prisma.shippingMethod.update({
      where: { id },
      data: {
        name,
        minWeight,
        maxWeight,
        cost,
        isActive,
      },
    })

    return NextResponse.json(shippingMethod)
  } catch (error) {
    console.error('[SHIPPING_METHOD_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params
    await prisma.shippingMethod.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[SHIPPING_METHOD_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
