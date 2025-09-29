import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        user: true,
      },
    })
    return NextResponse.json(orders)
  } catch (error) {
    console.error('[ORDERS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await request.json()
    const { items, shippingAddress, paymentMethod, total } = body

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        total,
        shippingAddress,
        paymentMethod,
        items: {
          create: items.map((item: CartItem) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error('[ORDERS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
