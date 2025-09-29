import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import ShippingMethodForm from '@/components/ShippingMethodForm'
import { prisma } from '@/lib/prisma'

interface EditShippingMethodPageProps {
  params: {
    id: string
  }
}

async function getShippingMethod(id: string) {
  const method = await prisma.shippingMethod.findUnique({
    where: { id },
  })
  return method
}

export default async function EditShippingMethodPage({ params }: EditShippingMethodPageProps) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const method = await getShippingMethod(params.id)

  if (!method) {
    return <div>Shipping method not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Shipping Method</h1>
      <ShippingMethodForm method={method} />
    </div>
  )
}
