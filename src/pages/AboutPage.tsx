import { Truck, Compass, Layers, MessageCircle } from 'lucide-react'
import { Card } from '../components/ui/Card'

const FEATURES = [
  {
    icon: Truck,
    title: 'On Time Delivery',
    description: 'Delivering Premium Quality Services, Right On Schedule',
  },
  {
    icon: Compass,
    title: 'Pro Design Approach',
    description: 'Creative Innovative Designs With Professional Industry Standards',
  },
  {
    icon: Layers,
    title: 'Modern & Clean Layouts',
    description: 'Minimal Clean Layouts For Modern Business Brands',
  },
  {
    icon: MessageCircle,
    title: 'Clients-focused Support',
    description: 'Dedicated Friendly Support Focused Completely On Clients',
  },
]

export function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative isolate min-h-screen overflow-hidden py-16 sm:py-20">
        <div className="container-page relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            {/* Left Side */}
            <div className="flex animate-fade-up flex-col gap-8">
              <div>
                <div className="mb-12 space-y-4">
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <h1 className="font-heading text-4xl font-black text-white sm:text-5xl lg:text-6xl">
                    THRE<span className="text-brand-teal">DACT</span>
                  </h1>
                  <p className="text-sm font-bold uppercase tracking-widest text-white sm:text-base">
                    EDIT BEYOND UNLIMITS
                  </p>
                  <div className="h-1 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </div>
              </div>
              <button className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/50 sm:w-auto">
                ABOUT US
                <span>→</span>
              </button>
            </div>

            {/* Right Side */}
            <div className="animate-fade-up space-y-6" style={{ animationDelay: '120ms' }}>
              <h2 className="font-heading text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                Where <span className="text-shimmer">Creativity</span> Meets Modern Digital Design.
              </h2>

              <div className="space-y-4">
                <p className="text-base leading-relaxed text-gray-300">
                  Thredact is a digital product platform focused on creating professional and customizable digital templates designed entirely using Canva. Our goal is to deliver clean, creative, and high-quality digital products that help individuals, creators, and businesses build a strong visual presence.
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                  We provide customized digital designs based on customer requirements, ensuring every project is professionally crafted with attention to quality, style, and presentation. Every template is designed exclusively using Canva to maintain consistency, flexibility, and a modern creative standard. At Thredact, we believe every customer deserves unique and professionally designed digital products delivered with proper customization and timely support.
                </p>
                <p className="text-base leading-relaxed text-gray-300">
                  Our mission is to create premium digital products that combine creativity, simplicity, and modern design for the future of digital branding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-20">
        <div className="container-page">
          <h2 className="mb-16 text-center font-heading text-3xl font-black text-white sm:text-4xl">
            Why Choose <span className="text-shimmer">Thredact?</span>
          </h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="hover-lift flex animate-fade-up flex-col items-center gap-4 p-8 text-center"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="rounded-full bg-gradient-to-br from-brand-teal/20 to-blue-500/20 p-4">
                    <Icon className="h-8 w-8 text-brand-teal" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-400">{feature.description}</p>
                </Card>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
