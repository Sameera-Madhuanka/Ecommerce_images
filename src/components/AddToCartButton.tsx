'use client'

import { useCart } from '@/context/CartContext'
import { Product } from '@prisma/client'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart()

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    })
  }

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
    >
      Add to Cart
    </button>
  )
}
