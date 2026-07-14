import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useResources } from '../../hooks/useResources'
import { ResourceCard } from '../downloads/ResourceCard'
import { Spinner } from '../ui/Spinner'
import { DOWNLOADS_PATH } from '../../constants/navigation'

export function DownloadsPreview() {
  const { resources, loading } = useResources()
  const preview = resources.slice(0, 3)

  if (!loading && preview.length === 0) return null

  return (
    <section className="py-20">
      <div className="container-page">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 animate-fade-up">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-teal">Free Resources</span>
            <h2 className="mt-2 font-heading text-3xl font-extrabold text-white">Latest <span className="text-shimmer">Downloads</span></h2>
          </div>
          <Link
            to={DOWNLOADS_PATH}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-teal hover:text-brand-teal-light"
          >
            View all
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-10">
            <Spinner size={28} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((resource, index) => (
              <div key={resource.id} className="animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
