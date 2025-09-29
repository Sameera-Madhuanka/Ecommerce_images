'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PaymentMethod {
  id: string
  name: string
  isActive: boolean
}

export default function PaymentMethodsTable({ methods: initialMethods }: { methods: PaymentMethod[] }) {
  const [methods, setMethods] = useState(initialMethods)

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this payment method?')) return

    const res = await fetch(`/api/payment-methods/${id}`, {
      method: 'DELETE'
    })

    if (res.ok) {
      setMethods(methods.filter(method => method.id !== id))
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Name</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {methods.map((method) => (
            <tr key={method.id}>
              <td className="px-4 py-2 border">{method.name}</td>
              <td className="px-4 py-2 border">{method.isActive ? 'Active' : 'Inactive'}</td>
              <td className="px-4 py-2 border">
                <Link href={`/admin/payment-methods/${method.id}/edit`} className="text-blue-500 hover:underline mr-2">
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(method.id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
