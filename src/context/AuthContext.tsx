import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/config'
import type { AdminUser } from '../types'

interface AuthContextValue {
  user: AdminUser | null
  loading: boolean
  error: string | null
  isAdminLoginOpen: boolean
  openAdminLogin: () => void
  closeAdminLogin: () => void
  login: (email: string, password: string) => Promise<boolean>
  demoLogin: () => Promise<boolean>
  logout: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return
    }
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser ? { uid: firebaseUser.uid, email: firebaseUser.email } : null)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null)
    if (!auth || !isFirebaseConfigured) {
      setError('Admin sign-in is not configured yet. Add Firebase credentials to enable this.')
      return false
    }
    try {
      await signInWithEmailAndPassword(auth, email, password)
      setIsAdminLoginOpen(false)
      return true
    } catch {
      setError('Invalid email or password.')
      return false
    }
  }

  const demoLogin = async (): Promise<boolean> => {
    setError(null)
    setUser({ uid: 'demo-admin', email: 'demo@thredact.com' })
    setIsAdminLoginOpen(false)
    return true
  }

  const logout = async () => {
    if (auth) await firebaseSignOut(auth)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAdminLoginOpen,
        openAdminLogin: () => {
          setError(null)
          setIsAdminLoginOpen(true)
        },
        closeAdminLogin: () => {
          setError(null)
          setIsAdminLoginOpen(false)
        },
        login,
        demoLogin,
        logout,
        clearError: () => setError(null),
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}
