import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Dashboard from '@/components/Dashboard'


export default async function AdminPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <Dashboard />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        <Link href="/admin/products" className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Products</h2>
          <p>Manage products</p>
        </Link>
        <Link href="/admin/categories" className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <p>Manage categories</p>
        </Link>
        <Link href="/admin/orders" className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Orders</h2>
          <p>View orders</p>
        </Link>
        <Link href="/admin/settings" className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p>Customize UI</p>
        </Link>
        <Link href="/admin/shipping" className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Shipping Methods</h2>
          <p>Manage shipping methods</p>
        </Link>
        <Link href="/admin/payment-methods" className="block p-6 bg-white border rounded-lg shadow-sm hover:shadow-md">
          <h2 className="text-xl font-semibold mb-2">Payment Methods</h2>
          <p>Manage payment methods</p>
        </Link>
      </div>


    </div>
  )
}
