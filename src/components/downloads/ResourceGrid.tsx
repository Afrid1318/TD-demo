import { useState } from 'react'
import { FolderOpen } from 'lucide-react'
import { Spinner } from '../ui/Spinner'
import { ResourceCard } from './ResourceCard'
import type { Resource, ResourceFilter } from '../../types'

const FILTERS: { key: ResourceFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'template', label: 'Templates' },
  { key: 'image', label: 'Images' },
  { key: 'pdf', label: 'PDFs' },
]

interface ResourceGridProps {
  resources: Resource[]
  loading: boolean
  isAdmin?: boolean
  onDelete?: (resource: Resource) => void
  onEdit?: (resource: Resource) => void
}

export function ResourceGrid({ resources, loading, isAdmin = false, onDelete, onEdit }: ResourceGridProps) {
  const [filter, setFilter] = useState<ResourceFilter>('all')

  const filtered = filter === 'all' ? resources : resources.filter((r) => r.type === filter)

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter resources by type">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
              filter === f.key
                ? 'bg-brand-teal text-brand-black'
                : 'border border-white/15 text-brand-muted hover:text-white'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Spinner size={32} />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-white/15 py-20 text-center">
          <FolderOpen size={32} className="text-brand-muted" aria-hidden="true" />
          <p className="text-sm text-brand-muted">No resources available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} isAdmin={isAdmin} onDelete={onDelete} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  )
}
