'use client'

import { useState, useRef, ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'


interface Category {
  id: string
  name: string
}

interface FormData {
  name: string
  description: string
  categoryId: string
  price: number
  purchasedPrice: number | null
  weight: number
  stock: number
  images: string[]
}

interface ProductFormProps {
  categories: Category[]
  product?: {
    id: string
    name: string
    description: string | null
    categoryId: string
    price: number
    purchasedPrice: number | null
    weight: number
    stock: number
    images: string[]
  }
}

export default function ProductForm({ categories, product }: ProductFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: product?.name || '',
    description: product?.description || '',
    categoryId: product?.categoryId || '',
    price: product?.price || 0,
    purchasedPrice: product?.purchasedPrice || 0,
    weight: product?.weight || 0,
    stock: product?.stock || 0,
    images: product?.images || []
  })
  const [isUploading, setIsUploading] = useState(false)
  const inputFileRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault()
    const method = product ? 'PUT' : 'POST'
    const url = product ? `/api/products/${product.id}` : '/api/products'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })

    if (res.ok) {
      router.push('/admin/products')
      router.refresh()
    }
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (res.ok) {
        const { url } = await res.json()
        setFormData((prev) => ({ ...prev, images: [...prev.images, url] }))
      } else {
        alert('Upload failed')
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      alert('Error uploading file')
    } finally {
      setIsUploading(false)
      if (inputFileRef.current) {
        inputFileRef.current.value = ''
      }
    }
  }


  const removeImage = (index: number) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          rows={4}
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select
          value={formData.categoryId}
          onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Purchased Price</label>
          <input
            type="number"
            step="0.01"
            value={formData.purchasedPrice || ''}
            onChange={(e) => setFormData({ ...formData, purchasedPrice: e.target.value ? parseFloat(e.target.value) : null })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Weight</label>
          <input
            type="number"
            step="0.01"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: parseFloat(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            value={formData.stock}
            onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Images</label>
        <div className="mt-1">
          <input
            type="file"
            ref={inputFileRef}
            onChange={handleFileChange}
            disabled={isUploading}
            accept="image/*"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {isUploading && <p className="mt-2 text-sm text-gray-500">Uploading...</p>}
        </div>
        <div className="flex flex-wrap gap-4 mt-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative w-24 h-24">
              <Image
                src={image}
                alt="Product image"
                fill
                className="rounded object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
        {product ? 'Update Product' : 'Create Product'}
      </button>
    </form>
  )
}
