import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: params.id,
      },
      include: {
        user: true,
        items: {
          include: {
            product: true,
          },
        },
      },
    })

    if (!order) {
      return new NextResponse('Order not found', { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDER_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const { status } = body

    if (!status) {
      return new NextResponse('Status is required', { status: 400 })
    }

    const updatedOrder = await prisma.order.update({
      where: {
        id: params.id,
      },
      data: {
        status,
      },
    })

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error('[ORDER_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
