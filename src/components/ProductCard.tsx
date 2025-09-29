import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <Image
        src={product.images[0] || '/placeholder.jpg'}
        alt={product.name}
        width={200}
        height={200}
        className="w-full h-48 object-cover rounded"
      />
      <h3 className="mt-2 font-semibold">{product.name}</h3>
      <p className="text-lg font-bold">${product.price}</p>
      <Link href={`/products/${product.id}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded">
        View Details
      </Link>
    </div>
  )
}
