'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import CartIcon from './CartIcon'


export function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Store
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="flex items-center space-x-4">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            {session?.user?.role === 'admin' && (
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
            )}
            {session ? (
              <>
                <Link href="/account" className="hover:underline">
                  Account
                </Link>
                <button onClick={() => signOut()} className="hover:underline">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="hover:underline">
                Sign In
              </Link>
            )}
          </nav>
          <CartIcon />
        </div>

      </div>
    </header>
  )
}
