'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Category } from '@prisma/client'

interface FilterSortProps {
  categories: Category[]
}

export default function FilterSort({ categories }: FilterSortProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value) {
      params.set('category', e.target.value)
    } else {
      params.delete('category')
    }
    router.push(`/?${params.toString()}`)
  }

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams)
    if (e.target.value) {
      params.set('sort', e.target.value)
    } else {
      params.delete('sort')
    }
    router.push(`/?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="category" className="text-sm font-medium">Category:</label>
        <select
          id="category"
          name="category"
          onChange={handleFilterChange}
          defaultValue={searchParams.get('category') || ''}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">All</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm font-medium">Sort by:</label>
        <select
          id="sort"
          name="sort"
          onChange={handleSortChange}
          defaultValue={searchParams.get('sort') || ''}
          className="border rounded-md px-3 py-2 text-sm"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          <option value="name-desc">Name: Z to A</option>
        </select>
      </div>
    </div>
  )

}
