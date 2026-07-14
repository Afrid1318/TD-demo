import { LogOut } from 'lucide-react'
import { UploadForm } from '../components/admin/UploadForm'
import { ResourceManageList } from '../components/admin/ResourceManageList'
import { Button } from '../components/ui/Button'
import { useAuth } from '../context/AuthContext'
import { useResources } from '../hooks/useResources'

export function AdminDashboardPage() {
  const { user, logout } = useAuth()
  const { resources } = useResources()

  const total = resources.length
  const templates = resources.filter((r) => r.type === 'template').length
  const images = resources.filter((r) => r.type === 'image').length
  const pdfs = resources.filter((r) => r.type === 'pdf').length

  const stats = [
    { label: 'Total Resources', value: total },
    { label: 'Templates', value: templates },
    { label: 'Images', value: images },
    { label: 'PDFs', value: pdfs },
  ]

  return (
    <>
      <section className="bg-hero-glow py-12 sm:py-16">
        <div className="container-page flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">Admin</span>
            <h1 className="mt-3 font-heading text-3xl font-extrabold text-white sm:text-4xl">Dashboard</h1>
            <p className="mt-2 max-w-full break-words text-sm text-brand-muted">Signed in as {user?.email}</p>
          </div>
          <Button variant="outline" onClick={logout} rightIcon={<LogOut size={16} aria-hidden="true" />} className="w-full sm:w-auto">
            Logout
          </Button>
        </div>
      </section>

      <section className="border-b border-white/10 py-8">
        <div className="container-page grid grid-cols-2 gap-4 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-center backdrop-blur-sm">
              <p className="font-heading text-3xl font-extrabold text-gradient-brand sm:text-4xl">{stat.value}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-wide text-brand-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-brand-black py-12 sm:py-16">
        <div className="container-page grid grid-cols-1 gap-8 lg:grid-cols-[minmax(300px,360px)_1fr] lg:gap-10">
          <UploadForm />
          <ResourceManageList />
        </div>
      </section>
    </>
  )
}
