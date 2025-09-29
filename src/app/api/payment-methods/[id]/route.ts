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
    const paymentMethod = await prisma.paymentMethod.findUnique({
      where: { id },
    })

    if (!paymentMethod) {
      return new NextResponse('Payment method not found', { status: 404 })
    }

    return NextResponse.json(paymentMethod)
  } catch (error) {
    console.error('[PAYMENT_METHOD_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    const { id } = params
    const body = await req.json()
    const { name, isActive } = body

    if (!name) {
      return new NextResponse('Name is required', { status: 400 })
    }

    const paymentMethod = await prisma.paymentMethod.update({
      where: { id },
      data: {
        name,
        isActive,
      },
    })

    return NextResponse.json(paymentMethod)
  } catch (error) {
    console.error('[PAYMENT_METHOD_PUT]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    const { id } = params
    await prisma.paymentMethod.delete({
      where: { id },
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('[PAYMENT_METHOD_DELETE]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
