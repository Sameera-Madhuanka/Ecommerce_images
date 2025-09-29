import { ProductCard } from '@/components/ProductCard'
import { prisma } from '@/lib/prisma'
import FilterSort from '@/components/FilterSort'

export const dynamic = 'force-dynamic'

async function getProducts({
  category,
  sort,
}: {
  category?: string
  sort?: string
}) {
  try {
    const where = category ? { categoryId: category } : {}
    let orderBy = {}

    switch (sort) {
      case 'price-asc':
        orderBy = { price: 'asc' }
        break
      case 'price-desc':
        orderBy = { price: 'desc' }
        break
      case 'name-asc':
        orderBy = { name: 'asc' }
        break
      case 'name-desc':
        orderBy = { name: 'desc' }
        break
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    return await prisma.product.findMany({
      where,
      orderBy,
      include: { category: true },
    })
  } catch {
    return []
  }
}

async function getCategories() {
  try {
    return await prisma.category.findMany()
  } catch {
    return []
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: { category?: string; sort?: string }
}) {
  const products = await getProducts(searchParams)
  const categories = await getCategories()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Welcome to Our Store</h1>
      <FilterSort categories={categories} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {products.length === 0 && (
        <p className="text-center text-gray-500">No products available.</p>
      )}
    </div>
  )
}
