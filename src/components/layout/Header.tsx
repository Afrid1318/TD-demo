import { useEffect, useRef, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'
import tdLogo from '../../assets/td-logo.png'
import { NAV_ITEMS } from '../../constants/navigation'
import { CATEGORIES } from '../../constants/content'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isCatOpen, setIsCatOpen] = useState(false)
  const catRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isCatOpen) return
    const handleClick = (event: MouseEvent) => {
      if (catRef.current && !catRef.current.contains(event.target as Node)) setIsCatOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isCatOpen])

  const primaryNav = NAV_ITEMS.filter((item) => item.path !== '/category')

  return (
    <header className="sticky top-0 z-50 bg-brand-black/80 backdrop-blur-md">
      <div className="container-page">
        <div className="my-2 flex min-w-0 items-center justify-between rounded-xl border border-white/15 px-3 py-3 sm:my-3 sm:px-6">
          <NavLink to="/" className="flex min-w-0 items-center gap-2" aria-label="THREDACT home">
            <img src={tdLogo} alt="THREDACT logo" className="h-8 w-auto shrink-0 sm:h-9" />
            <span className="font-heading text-xl font-extrabold tracking-tight text-white sm:text-2xl">
              THRE<span className="text-brand-teal">DACT</span>
            </span>
          </NavLink>

          <nav className="hidden items-center gap-5 md:flex lg:gap-8" aria-label="Primary navigation">
            {primaryNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive ? 'text-brand-teal' : 'text-brand-teal-light/80 hover:text-brand-teal'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <div
              className="relative"
              ref={catRef}
              onMouseEnter={() => setIsCatOpen(true)}
              onMouseLeave={() => setIsCatOpen(false)}
            >
              <NavLink
                to="/category"
                className={({ isActive }) =>
                  `flex items-center gap-1 text-xs font-bold uppercase tracking-widest transition-colors ${
                    isActive ? 'text-brand-teal' : 'text-brand-teal-light/80 hover:text-brand-teal'
                  }`
                }
                aria-haspopup="true"
                aria-expanded={isCatOpen}
              >
                Categories
                <ChevronDown size={14} aria-hidden="true" />
              </NavLink>
              {isCatOpen && (
                <div className="absolute right-0 top-full mt-3 w-56 rounded-xl border border-white/15 bg-brand-black-soft p-2 shadow-xl">
                  <Link
                    to="/category"
                    onClick={() => setIsCatOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-semibold text-brand-muted transition-colors hover:bg-white/5 hover:text-white"
                  >
                    All Categories
                  </Link>
                  <div className="my-1 h-px bg-white/10" />
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      to={`/category?cat=${category.id}`}
                      onClick={() => setIsCatOpen(false)}
                      className="block rounded-lg px-3 py-2 text-sm text-brand-muted transition-colors hover:bg-white/5 hover:text-brand-teal"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <button
            type="button"
            className="md:hidden rounded-lg p-2 text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen((value) => !value)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            className="md:hidden mb-3 rounded-xl border border-white/15 bg-brand-black-soft px-4 py-4 flex flex-col gap-4"
            aria-label="Mobile navigation"
          >
            {primaryNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-bold uppercase tracking-widest transition-colors ${
                    isActive ? 'text-brand-teal' : 'text-brand-teal-light/80'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <p className="text-xs font-bold uppercase tracking-widest text-brand-muted">Categories</p>
            <div className="flex flex-col gap-2 pl-2">
              <Link
                to="/category"
                onClick={() => setIsMenuOpen(false)}
                className="text-sm font-semibold text-brand-muted transition-colors hover:text-white"
              >
                All Categories
              </Link>
              {CATEGORIES.map((category) => (
                <Link
                  key={category.id}
                  to={`/category?cat=${category.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-sm text-brand-muted transition-colors hover:text-brand-teal"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
