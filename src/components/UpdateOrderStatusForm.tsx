'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface UpdateOrderStatusFormProps {
  orderId: string
  currentStatus: string
}

const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled']

export default function UpdateOrderStatusForm({ orderId, currentStatus }: UpdateOrderStatusFormProps) {
  const [status, setStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const res = await fetch(`/api/orders/${orderId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })

    if (res.ok) {
      router.refresh()
    }

    setIsLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm mt-8">
      <h2 className="text-xl font-semibold mb-4">Update Order Status</h2>
      <div className="flex items-center">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded-md px-3 py-2 mr-4"
        >
          {orderStatuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={isLoading || status === currentStatus}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isLoading ? 'Updating...' : 'Update Status'}
        </button>
      </div>
    </form>
  )
}
