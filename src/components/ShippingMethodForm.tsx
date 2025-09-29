'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface ShippingMethodFormProps {
  method?: {
    id: string
    name: string
    minWeight: number
    maxWeight: number | null
    cost: number
    isActive: boolean
  }
}

export default function ShippingMethodForm({ method }: ShippingMethodFormProps) {
  const [formData, setFormData] = useState({
    name: method?.name || '',
    minWeight: method?.minWeight ?? 0,
    maxWeight: method?.maxWeight ?? '',
    cost: method?.cost ?? 0,
    isActive: method?.isActive ?? true,
  })

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const apiMethod = method ? 'PUT' : 'POST'
    const url = method ? `/api/shipping/${method.id}` : '/api/shipping'

    const body = {
      ...formData,
      maxWeight: formData.maxWeight === '' ? null : Number(formData.maxWeight),
    }

    const res = await fetch(url, {
      method: apiMethod,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (res.ok) {
      router.push('/admin/shipping')
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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Min Weight (kg)</label>
          <input
            type="number"
            value={formData.minWeight}
            onChange={(e) => setFormData({ ...formData, minWeight: Number(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            step="0.01"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Max Weight (kg)</label>
          <input
            type="number"
            value={formData.maxWeight}
            onChange={(e) => setFormData({ ...formData, maxWeight: e.target.value })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            step="0.01"
            placeholder="Leave blank for no limit"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Cost</label>
        <input
          type="number"
          value={formData.cost}
          onChange={(e) => setFormData({ ...formData, cost: Number(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          step="0.01"
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
