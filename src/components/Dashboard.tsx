'use client'

import { useState, useEffect } from 'react'

interface DashboardData {
  totalSales: number
  orderCount: number
  customerCount: number
}

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/dashboard')
      const result = await res.json()
      setData(result)
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Total Sales</h3>
        <p className="text-3xl font-bold">${(data?.totalSales ?? 0).toFixed(2)}</p>

      </div>
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Orders</h3>
        <p className="text-3xl font-bold">{data?.orderCount}</p>
      </div>
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold">Customers</h3>
        <p className="text-3xl font-bold">{data?.customerCount}</p>
      </div>
    </div>
  )
}
