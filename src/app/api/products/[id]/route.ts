import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: Request, { params }: RouteContext) {
  try {
    const { id } = params
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = params
    const body = await request.json()
    const {
      name,
      description,
      categoryId,
      price,
      purchasedPrice,
      weight,
      stock,
      images
    } = body

    const product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        categoryId,
        price,
        purchasedPrice,
        weight,
        stock,
        images
      }
    })

    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: RouteContext) {
  try {
    const { id } = params
    await prisma.product.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Product deleted' })
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
