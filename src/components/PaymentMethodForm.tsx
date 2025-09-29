'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PaymentMethodFormProps {
  method?: {
    id: string
    name: string
    isActive: boolean
  }
}

export default function PaymentMethodForm({ method }: PaymentMethodFormProps) {
  const [formData, setFormData] = useState({
    name: method?.name || '',
    isActive: method?.isActive ?? true,
  })
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const apiMethod = method ? 'PUT' : 'POST'
    const url = method ? `/api/payment-methods/${method.id}` : '/api/payment-methods'

    const res = await fetch(url, {
      method: apiMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      router.push('/admin/payment-methods')
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        />
      </div>
      <div className="flex items-center">
        <input
          id="isActive"
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="ml-2 block text-sm font-medium">
          Active
        </label>
      </div>
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        {method ? 'Update Method' : 'Create Method'}
      </button>
    </form>
  )
}
