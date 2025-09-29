import Image from 'next/image'
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import AddToCartButton from '@/components/AddToCartButton'

interface ProductPageProps {
  params: {
    id: string;
  };
}

async function getProduct(id: string) {
  try {
    return await prisma.product.findUnique({
      where: { id },
      include: { category: true }
    })
  } catch {
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = params
  const product = await getProduct(id)

  if (!product) {
    notFound()
    return null
  }


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          {product.images.length > 0 ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-auto rounded"
            />
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded flex items-center justify-center">
              No Image
            </div>
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-xl font-semibold mb-4">${product.price}</p>
          <p className="mb-4">{product.description}</p>
          <p className="mb-2">Category: {product.category.name}</p>
          <p className="mb-4">Stock: {product.stock}</p>
          <AddToCartButton product={product} />

        </div>
      </div>
    </div>
  )
}
