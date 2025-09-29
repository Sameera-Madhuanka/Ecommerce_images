import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@/lib/auth'

export async function POST(req: Request) {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const body = await req.json()
    const { storeName, contactEmail, productsPerPage } = body

    const settingsToUpdate = [
      { key: 'storeName', value: JSON.stringify(storeName) },
      { key: 'contactEmail', value: JSON.stringify(contactEmail) },
      { key: 'productsPerPage', value: JSON.stringify(productsPerPage) },
    ]

    await prisma.$transaction(
      settingsToUpdate.map(setting =>
        prisma.setting.upsert({
          where: { key: setting.key },
          update: { value: setting.value },
          create: { key: setting.key, value: setting.value },
        })
      )
    )

    return new NextResponse('Settings updated', { status: 200 })
  } catch (error) {
    console.error('[SETTINGS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
}
