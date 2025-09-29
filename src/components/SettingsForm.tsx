'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Settings {
  storeName: string
  contactEmail: string
  productsPerPage: number
}

export default function SettingsForm({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState(initialSettings)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    })

    if (res.ok) {
      router.refresh()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium">Store Name</label>
        <input
          type="text"
          value={settings.storeName}
          onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Contact Email</label>
        <input
          type="email"
          value={settings.contactEmail}
          onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Products Per Page</label>
        <input
          type="number"
          value={settings.productsPerPage}
          onChange={(e) => setSettings({ ...settings, productsPerPage: Number(e.target.value) })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        Save Settings
      </button>
    </form>
  )
}
