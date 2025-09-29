import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ShippingMethodForm from '@/components/ShippingMethodForm'

export default async function NewShippingMethodPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Shipping Method</h1>
      <ShippingMethodForm />
    </div>
  )
}
