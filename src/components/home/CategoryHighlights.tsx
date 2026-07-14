import {
  Award,
  FileUser,
  Image,
  LayoutPanelTop,
  MailOpen,
  Megaphone,
  Newspaper,
  ArrowUpRight,
  ArrowRight,
  Utensils,
  Wallpaper,
} from 'lucide-react'
import { Card } from '../ui/Card'
import { CATEGORIES } from '../../constants/content'
import { Link } from 'react-router-dom'

const ICONS = {
  posters: Image,
  banners: Megaphone,
  'menu-cards': Utensils,
  invitations: MailOpen,
  magazines: Newspaper,
  resumes: FileUser,
  certificates: Award,
  backgrounds: Wallpaper,
}

export function CategoryHighlights() {
  return (
    <section className="py-14 sm:py-16 lg:py-20">
      <div className="container-page">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div className="min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">Browse</span>
            <h2 className="mt-2 break-words font-heading text-2xl font-extrabold text-white sm:text-3xl">
              Shop by <span className="text-shimmer">Category</span>
            </h2>
          </div>
          <Link
            to="/category"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal transition-colors hover:text-brand-teal-light"
          >
            View all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
          {CATEGORIES.map((category, index) => {
            const Icon = ICONS[category.id as keyof typeof ICONS] ?? LayoutPanelTop
            return (
              <Card
                key={category.id}
                className="group hover-lift min-w-0 cursor-pointer overflow-hidden p-4 animate-fade-up sm:p-6"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal animate-pulse-glow sm:h-12 sm:w-12">
                    <Icon size={22} aria-hidden="true" className="transition-transform duration-300 group-hover:scale-110" />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-brand-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-teal"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="break-words font-heading text-lg font-bold text-white">{category.name}</h3>
                <p className="mt-2 break-words text-sm leading-relaxed text-brand-muted">{category.description}</p>
                <div className="mt-4 flex flex-col gap-2">
                  {category.templates.slice(0, 4).map((template) => (
                    <div
                      key={template.id}
                      className="flex min-w-0 items-center justify-between gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2"
                    >
                      <span className="min-w-0 break-words text-xs font-semibold leading-snug text-white/85">
                        {template.title}
                      </span>
                      <span className="shrink-0 rounded-md bg-brand-teal/15 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-brand-teal">
                        {template.format}
                      </span>
                    </div>
                  ))}
                  <p className="mt-1 text-[11px] font-semibold text-brand-teal">
                    +{category.templates.length - 4} more templates
                  </p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
