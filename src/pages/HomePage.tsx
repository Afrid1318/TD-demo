import { Hero } from '../components/home/Hero'
import { StatsBand } from '../components/home/StatsBand'
import { TemplateMarquee } from '../components/home/TemplateMarquee'
import { CategoryHighlights } from '../components/home/CategoryHighlights'
import { DownloadsPreview } from '../components/home/DownloadsPreview'

export function HomePage() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="relative z-10">
        <Hero />
        <StatsBand />
        <TemplateMarquee />
        <CategoryHighlights />
        <DownloadsPreview />
      </div>
    </div>
  )
}
