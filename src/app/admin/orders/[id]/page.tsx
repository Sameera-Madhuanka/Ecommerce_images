import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Order, User, OrderItem, Product } from '@prisma/client'
import UpdateOrderStatusForm from '@/components/UpdateOrderStatusForm'

interface OrderDetailPageProps {
  params: {
    id: string;
  };
}

type OrderDetails = Order & {
  user: User
  items: (OrderItem & { product: Product })[]
}

async function getOrder(id: string): Promise<OrderDetails | null> {
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  })
  return order
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const order = await getOrder(params.id)

  if (!order) {
    notFound()
    // This return is necessary to help TypeScript understand that `order` is not null below,
    // which resolves the "possibly 'null'" errors.
    return null
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order #{order.id.substring(0, 8)}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <ul>
              {order.items.map(item => (
                <li key={item.id} className="flex justify-between items-center py-2 border-b">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <p><strong>Name:</strong> {order.user.name}</p>
            <p><strong>Email:</strong> {order.user.email}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Shipping Address</h3>
            <p>{order.shippingAddress}</p>
            <h3 className="text-lg font-semibold mt-4 mb-2">Order Summary</h3>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${(order.total - order.shippingCost).toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${order.shippingCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>Total</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
          <UpdateOrderStatusForm orderId={order.id} currentStatus={order.status} />
        </div>
      </div>
    </div>

  )
}
