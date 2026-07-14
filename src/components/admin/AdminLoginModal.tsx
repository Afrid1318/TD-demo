import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_PATH } from '../../constants/navigation'

export function AdminLoginModal() {
  const { isAdminLoginOpen, closeAdminLogin, login, demoLogin, error } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    const success = await login(email, password)
    setSubmitting(false)
    if (success) navigate(ADMIN_PATH)
  }

  const handleDemoLogin = async () => {
    const success = await demoLogin()
    if (success) navigate(ADMIN_PATH)
  }

  return (
    <Modal isOpen={isAdminLoginOpen} onClose={closeAdminLogin} title="Admin Access">
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-lg bg-brand-blue-deep/30 p-3 text-brand-teal text-sm">
          <Lock size={16} aria-hidden="true" />
          <span>Sign in with your admin credentials</span>
        </div>

        <Input
          id="admin-email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@thredact.com"
        />
        <Input
          id="admin-password"
          label="Password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        {error && (
          <p role="alert" className="text-sm text-brand-danger">
            {error}
          </p>
        )}

        <Button type="submit" isLoading={submitting} className="w-full">
          Sign In
        </Button>

        <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-brand-muted">
          <span className="h-px flex-1 bg-white/10" />
          or
          <span className="h-px flex-1 bg-white/10" />
        </div>

        <Button type="button" variant="secondary" onClick={handleDemoLogin} className="w-full">
          Enter Demo Dashboard
        </Button>
      </form>
    </Modal>
  )
}
