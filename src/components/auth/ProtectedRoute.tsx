import { useEffect, type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { Spinner } from '../ui/Spinner'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading, openAdminLogin } = useAuth()

  useEffect(() => {
    if (!loading && !user) openAdminLogin()
  }, [loading, user, openAdminLogin])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-brand-black">
        <Spinner size={32} />
      </div>
    )
  }

  if (!user) return <Navigate to="/" replace />

  return <>{children}</>
}
