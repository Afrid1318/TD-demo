import { ArrowRight, Sparkles, Download, Layers } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import tdText from '../../assets/td-text.png'
import { Button } from '../ui/Button'
import { SocialLinks } from './SocialLinks'

export function Hero() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden">
      {/* Floating glow orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-10 top-10 h-72 w-72 rounded-full bg-brand-teal/20 blur-[90px] animate-float"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/3 h-72 w-72 rounded-full bg-brand-blue/20 blur-[90px] animate-float-slow"
      />

      <div className="container-page grid grid-cols-1 items-center gap-8 py-10 pb-14 sm:gap-12 sm:py-16 sm:pb-16 lg:min-h-[88vh] lg:grid-cols-2 lg:gap-12 lg:py-0">
        {/* Left: logo + floating badges */}
        <div className="relative flex animate-fade-up items-center justify-center">
          <div className="animate-pulse-glow">
            <img
              src={tdText}
              alt="THREDACT — Edit Beyond Unlimits, 2026"
              className="w-full max-w-sm drop-shadow-[0_0_40px_rgba(63,220,224,0.35)] sm:max-w-lg"
            />
          </div>

          <div className="absolute -left-2 top-6 hidden animate-float items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md sm:flex">
            <Sparkles size={16} className="text-brand-teal" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">New Arrivals</span>
          </div>
          <div className="absolute right-0 top-1/3 hidden animate-float-slow items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md sm:flex">
            <Layers size={16} className="text-brand-blue-light" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">500+ Templates</span>
          </div>
          <div
            className="absolute bottom-4 left-6 hidden animate-float items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 backdrop-blur-md sm:flex"
            style={{ animationDelay: '1s' }}
          >
            <Download size={16} className="text-brand-teal" aria-hidden="true" />
            <span className="text-xs font-semibold text-white">Free Downloads</span>
          </div>
        </div>

        {/* Right: copy */}
        <div className="flex animate-fade-up flex-col items-center gap-6 text-center sm:items-start sm:text-left" style={{ animationDelay: '150ms' }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-teal/30 bg-brand-teal/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-teal">
            <span className="h-2 w-2 animate-pulse rounded-full bg-brand-teal" />
            Edit Beyond Unlimits
          </span>
          <h1 className="font-heading text-4xl font-extrabold leading-tight text-white sm:text-5xl lg:text-6xl">
            Shop 'til you drop with <span className="text-shimmer">THREDACT</span>
          </h1>
          <p className="max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">
            Shopping sprees are now so much easier, with the world's top brands at your fingertips. Simply click and go to discover the best finds in fashion, electronics, homeware and more!
          </p>
          <Button
            size="lg"
            rightIcon={<ArrowRight size={18} aria-hidden="true" />}
            className="w-full sm:w-auto"
            onClick={() => navigate('/category')}
          >
            Explore Templates
          </Button>
          <SocialLinks />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="pointer-events-none flex justify-center pb-8">
        <div className="flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1">
          <span className="h-2 w-1 animate-float rounded-full bg-brand-teal" />
        </div>
      </div>
    </section>
  )
}
