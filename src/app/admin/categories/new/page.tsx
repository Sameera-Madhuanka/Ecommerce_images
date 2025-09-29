import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CategoryForm from '@/components/CategoryForm'

export default async function NewCategoryPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Add New Category</h1>
      <CategoryForm />
    </div>
  )
}
