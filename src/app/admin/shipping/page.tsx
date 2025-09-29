import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import ShippingMethodsTable from '@/components/ShippingMethodsTable'
import { prisma } from '@/lib/prisma'

async function getShippingMethods() {
  const methods = await prisma.shippingMethod.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })
  return methods
}

export default async function ShippingPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const methods = await getShippingMethods()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Shipping Methods</h1>
        <Link href="/admin/shipping/new" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
          Add New Method
        </Link>
      </div>
      <ShippingMethodsTable methods={methods} />
    </div>
  )
}
