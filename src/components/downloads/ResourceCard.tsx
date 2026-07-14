import { FileText, Image as ImageIcon, FileType2, Download, Trash2, Pencil } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import type { Resource } from '../../types'
import { formatDate, formatFileSize, getResourceTypeLabel } from '../../utils/formatters'

const TYPE_ICON = { template: FileType2, image: ImageIcon, pdf: FileText }
const TYPE_VARIANT = { template: 'blue', image: 'teal', pdf: 'muted' } as const

interface ResourceCardProps {
  resource: Resource
  onDelete?: (resource: Resource) => void
  onEdit?: (resource: Resource) => void
  isAdmin?: boolean
}

export function ResourceCard({ resource, onDelete, onEdit, isAdmin = false }: ResourceCardProps) {
  const Icon = TYPE_ICON[resource.type]

  return (
    <Card className="hover-lift flex flex-col gap-4 p-5">
      <div className="flex items-start justify-between">
        <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-brand-teal">
          <Icon size={20} aria-hidden="true" />
        </span>
        <Badge variant={TYPE_VARIANT[resource.type]}>{getResourceTypeLabel(resource.type)}</Badge>
      </div>

      <div>
        <h3 className="font-heading text-base font-bold text-white line-clamp-1">{resource.title}</h3>
        <p className="mt-1 text-sm text-brand-muted line-clamp-2">{resource.description}</p>
      </div>

      <div className="flex items-center justify-between text-xs text-brand-muted">
        <span>{formatFileSize(resource.sizeBytes)}</span>
        <span>{formatDate(resource.createdAt)}</span>
      </div>

      <div className="mt-auto flex items-center gap-2 pt-2">
        <a
          href={resource.fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          download={resource.fileName}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-brand-blue px-4 py-2 text-xs font-bold uppercase text-white transition-all hover:brightness-110"
        >
          <Download size={14} aria-hidden="true" />
          Download
        </a>
        {isAdmin && onDelete && (
          <button
            type="button"
            onClick={() => onDelete(resource)}
            aria-label={`Delete ${resource.title}`}
            className="inline-flex items-center justify-center rounded-full border border-white/15 p-2.5 text-brand-muted transition-colors hover:border-brand-danger/60 hover:text-brand-danger"
          >
            <Trash2 size={14} aria-hidden="true" />
          </button>
        )}
        {isAdmin && onEdit && (
          <button
            type="button"
            onClick={() => onEdit(resource)}
            aria-label={`Edit ${resource.title}`}
            className="inline-flex items-center justify-center rounded-full border border-white/15 p-2.5 text-brand-muted transition-colors hover:border-brand-teal/60 hover:text-brand-teal"
          >
            <Pencil size={14} aria-hidden="true" />
          </button>
        )}
      </div>
    </Card>
  )
}
