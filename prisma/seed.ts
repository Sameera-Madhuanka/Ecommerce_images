import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('sameera123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'sameera@gmail.com' },
    update: {},
    create: {
      email: 'sameera@gmail.com',
      name: 'Admin',
      password: hashedPassword,
      role: 'admin'
    }
  })

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets'
    }
  })

  const clothing = await prisma.category.upsert({
    where: { name: 'Clothing' },
    update: {},
    create: {
      name: 'Clothing',
      description: 'Fashion and apparel'
    }
  })

  // Create sample products
  await prisma.product.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Sample Laptop',
      description: 'A powerful laptop for work and gaming',
      categoryId: electronics.id,
      price: 999.99,
      purchasedPrice: 800.00,
      weight: 2.5,
      stock: 10,
      images: ['https://via.placeholder.com/500x500?text=Laptop']
    }
  })

  await prisma.product.upsert({
    where: { id: '2' },
    update: {},
    create: {
      id: '2',
      name: 'Sample T-Shirt',
      description: 'Comfortable cotton t-shirt',
      categoryId: clothing.id,
      price: 19.99,
      purchasedPrice: 10.00,
      weight: 0.2,
      stock: 50,
      images: ['https://via.placeholder.com/500x500?text=T-Shirt']
    }
  })

  // Create payment method
  await prisma.paymentMethod.upsert({
    where: { name: 'Cash on Delivery' },
    update: {},
    create: {
      name: 'Cash on Delivery',
      isActive: true
    }
  })

  // Create shipping method
  await prisma.shippingMethod.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      name: 'Standard Shipping',
      minWeight: 0,
      maxWeight: 5,
      cost: 5.99,
      isActive: true
    }
  })

  console.log('Database seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
