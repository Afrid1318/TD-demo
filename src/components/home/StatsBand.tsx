const STATS = [
  { value: '500+', label: 'Ready Templates' },
  { value: '8', label: 'Design Categories' },
  { value: '100%', label: 'Free Downloads' },
  { value: '24/7', label: 'Expert Support' },
]

export function StatsBand() {
  return (
    <section className="py-10 sm:py-14">
      <div className="container-page grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className="animate-fade-up rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-sm"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <p className="font-heading text-3xl font-extrabold text-gradient-brand sm:text-4xl">{stat.value}</p>
            <p className="mt-2 text-xs font-bold uppercase tracking-wide text-brand-muted">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
