import { prisma } from '@/lib/prisma'
import OrdersTable from '@/components/OrdersTable'
import { Order, User } from '@prisma/client'

export type OrderWithUser = Order & { user: User }

async function getOrders(): Promise<OrderWithUser[]> {
  const orders = await prisma.order.findMany({
    include: {
      user: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return orders
}

export default async function OrdersPage() {
  const orders = await getOrders()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>
      <OrdersTable orders={orders} />
    </div>
  )
}
