import Link from 'next/link'

export default function OrderSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <div className="max-w-md mx-auto">
        <div className="text-green-500 text-6xl mb-4">✓</div>
        <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. You will receive a confirmation email shortly.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="block w-full bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  )
}
