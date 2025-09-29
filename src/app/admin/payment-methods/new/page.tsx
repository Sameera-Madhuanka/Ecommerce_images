import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import PaymentMethodForm from '@/components/PaymentMethodForm'

export default async function NewPaymentMethodPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Payment Method</h1>
      <PaymentMethodForm />
    </div>
  )
}
