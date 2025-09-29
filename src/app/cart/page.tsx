'use client'

import { useCart } from '@/context/CartContext'
import Link from 'next/link'

export default function CartPage() {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-500">Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:underline">
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-between items-center">
            <h2 className="text-2xl font-bold">Total: ${total.toFixed(2)}</h2>
            <div className="flex space-x-4">
              <button onClick={clearCart} className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Clear Cart
              </button>
              <Link href="/checkout" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
