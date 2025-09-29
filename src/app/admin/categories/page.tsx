import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import CategoriesTable from '@/components/CategoriesTable'

async function getCategories() {
  return await prisma.category.findMany()
}

export default async function AdminCategoriesPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Link href="/admin/categories/new" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Add Category
        </Link>
      </div>
      <CategoriesTable categories={categories} />
    </div>
  )
}
