import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/ProductForm'

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function NewProductPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Product</h1>
      <ProductForm categories={categories} />
    </div>
  )
}
