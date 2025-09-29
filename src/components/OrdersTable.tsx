'use client'

import Link from 'next/link'
import { Order, User } from '@prisma/client'

interface OrderWithUser extends Order {
  user: User
}

export default function OrdersTable({ orders }: { orders: OrderWithUser[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Order ID</th>
            <th className="px-4 py-2 border">Customer</th>
            <th className="px-4 py-2 border">Date</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Total</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="px-4 py-2 border font-mono text-sm">{order.id}</td>
              <td className="px-4 py-2 border">{order.user.name}</td>
              <td className="px-4 py-2 border">{new Date(order.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                  order.status === 'processing' ? 'bg-blue-200 text-blue-800' :
                  order.status === 'shipped' ? 'bg-green-200 text-green-800' :
                  order.status === 'delivered' ? 'bg-purple-200 text-purple-800' :
                  'bg-gray-200 text-gray-800'
                }`}>
                  {order.status}
                </span>
              </td>
              <td className="px-4 py-2 border">${order.total.toFixed(2)}</td>
              <td className="px-4 py-2 border">
                <Link href={`/admin/orders/${order.id}`} className="text-blue-500 hover:underline">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
