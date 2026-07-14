import { useSearchParams } from 'react-router-dom'
import {
  Award,
  ExternalLink,
  FileUser,
  Image,
  LayoutPanelTop,
  MailOpen,
  Megaphone,
  Newspaper,
  Utensils,
  Wallpaper,
} from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { CATEGORIES } from '../constants/content'

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

export function CategoryPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const catParam = searchParams.get('cat')
  const selected = catParam && CATEGORIES.some((category) => category.id === catParam) ? catParam : null

  const selectCategory = (id: string | null) => {
    if (id) setSearchParams({ cat: id })
    else setSearchParams({})
  }

  const visibleCategories = selected
    ? CATEGORIES.filter((category) => category.id === selected)
    : CATEGORIES

  const templateImage = (template: (typeof CATEGORIES)[number]['templates'][number]) =>
    template.imageUrl ?? `https://picsum.photos/seed/${template.id}/600/450`

  return (
    <>
      <PageHeader
        eyebrow="Browse"
        title="Design Categories"
        description="Explore ready-to-customize designs for posters, banners, menu cards, invitations, magazines, resumes and certificates."
      />
      <nav className="sticky top-20 z-20 border-b border-white/10 bg-brand-black/90 backdrop-blur">
        <div className="container-page flex gap-2 overflow-x-auto py-3">
          <button
            type="button"
            onClick={() => selectCategory(null)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              selected === null
                ? 'border-brand-teal bg-brand-teal/15 text-brand-teal'
                : 'border-white/10 text-brand-muted hover:border-brand-teal hover:text-brand-teal'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((category) => {
            const Icon = ICONS[category.id as keyof typeof ICONS] ?? LayoutPanelTop
            const isActive = selected === category.id
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => selectCategory(category.id)}
                className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'border-brand-teal bg-brand-teal/15 text-brand-teal'
                    : 'border-white/10 text-brand-muted hover:border-brand-teal hover:text-brand-teal'
                }`}
              >
                <Icon size={16} aria-hidden="true" />
                {category.name}
              </button>
            )
          })}
        </div>
      </nav>
      <section className="py-12 sm:py-16">
        <div
          className={`container-page grid grid-cols-1 gap-4 sm:gap-6 ${
            selected ? '' : 'lg:grid-cols-2'
          }`}
        >
          {visibleCategories.map((category, index) => {
            const Icon = ICONS[category.id as keyof typeof ICONS] ?? LayoutPanelTop
            return (
              <Card
                key={category.id}
                className="group hover-lift flex min-w-0 cursor-pointer flex-col gap-4 overflow-hidden p-4 animate-fade-up sm:flex-row sm:items-start sm:gap-5 sm:p-6 lg:p-7"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal sm:h-14 sm:w-14">
                  <Icon size={24} aria-hidden="true" className="sm:h-[26px] sm:w-[26px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 items-start justify-between gap-3">
                    <h2 className="min-w-0 break-words font-heading text-lg font-bold text-white sm:text-xl">
                      {category.name}
                    </h2>
                    <a
                      href={category.galleryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-muted transition-colors hover:border-brand-teal hover:text-brand-teal"
                      aria-label={`Browse ${category.name} templates on Google`}
                    >
                      <ExternalLink size={14} aria-hidden="true" />
                      Templates
                    </a>
                  </div>
                  <p className="mt-2 break-words text-sm leading-relaxed text-brand-muted">{category.description}</p>
                  <div
                    className={`mt-4 grid grid-cols-1 gap-3 sm:mt-5 sm:grid-cols-2 ${
                      selected ? 'lg:grid-cols-3 xl:grid-cols-4' : ''
                    }`}
                  >
                    {(selected ? category.templates : category.templates.slice(0, 6)).map((template) => (
                      <div
                        key={template.id}
                        className="group/template hover-lift min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]"
                      >
                        <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-brand-teal/20 via-brand-black to-brand-teal/10">
                          <img
                            src={templateImage(template)}
                            alt={template.title}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-300 group-hover/template:scale-105"
                          />
                          <span className="absolute right-2 top-2 rounded-md bg-brand-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-teal backdrop-blur">
                            {template.format}
                          </span>
                        </div>
                        <div className="p-3">
                          <p className="break-words text-sm font-semibold leading-snug text-white">
                            {template.title}
                          </p>
                          <p className="mt-1 break-words text-xs leading-snug text-brand-muted">
                            {template.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  {!selected && category.templates.length > 6 && (
                    <button
                      type="button"
                      onClick={() => selectCategory(category.id)}
                      className="mt-4 text-xs font-semibold text-brand-teal transition-colors hover:text-white"
                    >
                      +{category.templates.length - 6} more templates — view category
                    </button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </section>
    </>
  )
}
