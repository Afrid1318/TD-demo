import { CATEGORIES } from '../../constants/content'

const SAMPLES = CATEGORIES.flatMap((category) => category.templates.slice(0, 2))

export function TemplateMarquee() {
  const items = [...SAMPLES, ...SAMPLES]

  return (
    <section className="py-10 sm:py-14">
      <div className="container-page mb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">Trending Now</span>
        <h2 className="mt-2 font-heading text-3xl font-extrabold text-white sm:text-4xl">
          Fresh <span className="text-shimmer">Templates</span> Every Day
        </h2>
      </div>

      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track gap-5 px-2">
          {items.map((template, index) => (
            <div
              key={`${template.id}-${index}`}
              className="group w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-brand-teal/40"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${template.id}/500/380`}
                  alt={template.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute right-2 top-2 rounded-md bg-brand-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-brand-teal backdrop-blur">
                  {template.format}
                </span>
              </div>
              <div className="p-3">
                <p className="truncate text-sm font-semibold text-white">{template.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
