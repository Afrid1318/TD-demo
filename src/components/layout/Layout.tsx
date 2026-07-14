import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'
import { AdminLoginModal } from '../admin/AdminLoginModal'
import { AnimatedBackground } from '../home/AnimatedBackground'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <AnimatedBackground />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <AdminLoginModal />
    </div>
  )
}
