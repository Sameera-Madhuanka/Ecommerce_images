import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function GET() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const totalSales = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: 'delivered',
      },
    })

    const orderCount = await prisma.order.count()
    const customerCount = await prisma.user.count({
      where: {
        role: 'customer',
      },
    })

    return NextResponse.json({
      totalSales: totalSales._sum.total ?? 0,
      orderCount,
      customerCount,
    })
  } catch (error) {
    console.error('[DASHBOARD_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
