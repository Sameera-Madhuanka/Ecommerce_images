import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url)
    const searchParams = url.searchParams

    const categoryId = searchParams.get('categoryId')
    const search = searchParams.get('search')
    const sort = searchParams.get('sort')

    const where: Prisma.ProductWhereInput = {}
    if (categoryId) {
      where.categoryId = categoryId
    }
    if (search) {
      where.name = { contains: search, mode: 'insensitive' }
    }

    const orderBy: Prisma.ProductOrderByWithRelationInput = {}
    if (sort === 'price_asc') {
      orderBy.price = 'asc'
    } else if (sort === 'price_desc') {
      orderBy.price = 'desc'
    } else {
      orderBy.createdAt = 'desc'
    }

    const products = await prisma.product.findMany({
      where,
      orderBy,
      include: { category: true }
    })

    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()

    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        categoryId: data.categoryId,
        price: data.price,
        purchasedPrice: data.purchasedPrice,
        weight: data.weight,
        stock: data.stock,
        images: data.images
      }
    })

    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
