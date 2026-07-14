interface PageHeaderProps {
  eyebrow: string
  title: string
  description?: string
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <section className="bg-hero-glow py-12 sm:py-16 lg:py-20">
      <div className="container-page animate-fade-up text-center sm:text-left">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">{eyebrow}</span>
        <h1 className="mt-3 break-words font-heading text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">{title}</h1>
        {description && <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-muted sm:text-base">{description}</p>}
      </div>
    </section>
  )
}
