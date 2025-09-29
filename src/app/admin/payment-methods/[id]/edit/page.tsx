import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import PaymentMethodForm from '@/components/PaymentMethodForm'
import { prisma } from '@/lib/prisma'

interface EditPaymentMethodPageProps {
  params: {
    id: string
  }
}

async function getPaymentMethod(id: string) {
  const method = await prisma.paymentMethod.findUnique({
    where: { id },
  })
  return method
}

export default async function EditPaymentMethodPage({ params }: EditPaymentMethodPageProps) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const method = await getPaymentMethod(params.id)

  if (!method) {
    return <div>Payment method not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Payment Method</h1>
      <PaymentMethodForm method={method} />
    </div>
  )
}
