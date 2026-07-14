import { Truck, ShieldCheck, Headset, RotateCcw } from 'lucide-react'
import { PageHeader } from '../components/common/PageHeader'
import { Card } from '../components/ui/Card'
import { SERVICES } from '../constants/content'

const ICONS = { shipping: Truck, payment: ShieldCheck, support: Headset, returns: RotateCcw }

export function ServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Why THREDACT"
        title="Service You Can Trust"
        description="We go beyond the checkout — every order is backed by fast delivery, secure payments, dedicated support and effortless returns."
      />
      <section className="py-16">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[service.id as keyof typeof ICONS]
            return (
              <Card
                key={service.id}
                className="hover-lift flex flex-col items-start gap-4 p-7 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue-light">
                  <Icon size={26} aria-hidden="true" />
                </span>
                <h2 className="font-heading text-lg font-bold text-white">{service.title}</h2>
                <p className="text-sm leading-relaxed text-brand-muted">{service.description}</p>
              </Card>
            )
          })}
        </div>
      </section>
    </>
  )
}
