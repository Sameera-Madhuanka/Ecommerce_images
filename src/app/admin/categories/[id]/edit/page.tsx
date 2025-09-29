import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CategoryForm from '@/components/CategoryForm'

interface EditCategoryPageProps {
  params: {
    id: string;
  };
}

async function getCategory(id: string) {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/categories/${id}`)
  if (!res.ok) return null
  return res.json()
}

export default async function EditCategoryPage({ params }: EditCategoryPageProps) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const { id } = params
  const category = await getCategory(id)

  if (!category) {
    return <div>Category not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Category</h1>
      <CategoryForm category={category} />
    </div>
  )
}
