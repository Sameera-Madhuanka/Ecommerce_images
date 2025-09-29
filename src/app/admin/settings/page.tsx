import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import SettingsForm from '@/components/SettingsForm'
import { prisma } from '@/lib/prisma'

async function getSettings() {
  const settings = await prisma.setting.findMany()
    const settingsObject = settings.reduce((acc, setting) => {
      acc[setting.key] = JSON.parse(setting.value)
      return acc
    }, {} as Record<string, unknown>)


  return {
    storeName: (settingsObject.storeName as string) ?? 'My Store',
    contactEmail: (settingsObject.contactEmail as string) ?? '',
    productsPerPage: (settingsObject.productsPerPage as number) ?? 12,
  }

}

export default async function SettingsPage() {
  const session = await auth()

  if (!session || session.user.role !== 'admin') {
    redirect('/auth/signin')
  }

  const settings = await getSettings()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <SettingsForm initialSettings={settings} />
    </div>
  )
}
