import { NavLink, useNavigate } from 'react-router-dom'
import { Lock, LogOut } from 'lucide-react'
import tdText from '../../assets/td-text.png'
import { NAV_ITEMS, DOWNLOADS_PATH, ADMIN_PATH } from '../../constants/navigation'
import { SocialLinks } from '../home/SocialLinks'
import { useAuth } from '../../context/AuthContext'

const COMPANY_NAME = 'InnoApp Technologies'
const COMPANY_URL = 'https://www.innoapptechnologies.in'

export function Footer() {
  const { user, demoLogin, logout } = useAuth()
  const navigate = useNavigate()

  const handleAdminLogin = async () => {
    const success = await demoLogin()
    if (success) navigate(ADMIN_PATH)
  }

  return (
    <footer className="border-t border-white/10 bg-brand-black-soft/80">
      <div className="container-page py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          <div className="flex min-w-0 flex-col gap-4">
            <img src={tdText} alt="THREDACT — Edit Beyond Unlimits" className="w-full max-w-[220px]" />
            <p className="max-w-xs text-sm leading-relaxed text-brand-muted">
              Shop 'til you drop with THREDACT — the world's top brands in fashion, electronics,
              homeware and more, all at your fingertips.
            </p>
            <SocialLinks size="sm" />
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-teal">
              Explore
            </h3>
            {NAV_ITEMS.map((item) => (
              <NavLink key={item.path} to={item.path} className="text-sm text-brand-muted hover:text-white transition-colors">
                {item.label}
              </NavLink>
            ))}
            {user && (
              <NavLink to={ADMIN_PATH} className="text-sm font-semibold text-brand-teal hover:text-brand-teal-light transition-colors">
                Dashboard
              </NavLink>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-teal">
              Resources
            </h3>
            <NavLink to={DOWNLOADS_PATH} className="text-sm text-brand-muted hover:text-white transition-colors">
              Downloads
            </NavLink>
            <a href="#" className="text-sm text-brand-muted hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-brand-muted hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-brand-teal">
              Newsletter
            </h3>
            <p className="text-sm text-brand-muted">Get the latest drops and offers in your inbox.</p>
            <form
              className="flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-center"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <input
                type="email"
                required
                placeholder="you@email.com"
                aria-label="Email address"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white placeholder:text-brand-muted/60 outline-none focus:border-brand-teal"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-brand-blue px-4 py-2 text-xs font-bold uppercase text-white hover:brightness-110 transition-all"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 border-t border-white/10 pt-6 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="text-xs text-brand-muted">© 2026 THREDACT. All rights reserved.</p>

          <p className="text-xs text-brand-muted">
            Developed by{' '}
            <a
              href={COMPANY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-teal hover:text-brand-teal-light transition-colors"
            >
              {COMPANY_NAME}
            </a>
          </p>

          {user ? (
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-end">
              <span className="max-w-full break-words text-xs text-brand-muted">Signed in as {user.email}</span>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-brand-muted hover:text-white hover:border-brand-teal/50 transition-colors"
              >
                <LogOut size={13} aria-hidden="true" />
                Logout
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleAdminLogin}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 text-xs font-semibold text-brand-muted hover:text-brand-teal hover:border-brand-teal/50 transition-colors"
            >
              <Lock size={13} aria-hidden="true" />
              Admin Login
            </button>
          )}
        </div>
      </div>
    </footer>
  )
}
