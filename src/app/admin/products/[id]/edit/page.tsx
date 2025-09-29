import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProductForm from '@/components/ProductForm'

async function getProduct(id: string) {
  return await prisma.product.findUnique({
    where: { id },
    include: { category: true }
  })
}

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const { id } = await params
  const product = await getProduct(id)
  const categories = await getCategories()

  if (!product) {
    redirect('/admin/products')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Product</h1>
      <ProductForm categories={categories} product={product} />
    </div>
  )
}
