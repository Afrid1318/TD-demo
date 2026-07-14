import { useMemo, useState } from 'react'
import { AlertTriangle, Search } from 'lucide-react'
import { ResourceGrid } from '../downloads/ResourceGrid'
import { Modal } from '../ui/Modal'
import { Button } from '../ui/Button'
import { Input, Textarea } from '../ui/Input'
import { useResources } from '../../hooks/useResources'
import { useToast } from '../../context/ToastContext'
import type { Resource, ResourceType } from '../../types'

const TYPE_OPTIONS: { key: ResourceType; label: string }[] = [
  { key: 'template', label: 'Template' },
  { key: 'image', label: 'Image' },
  { key: 'pdf', label: 'PDF' },
]

export function ResourceManageList() {
  const { resources, loading, deleteResource, updateResource } = useResources()
  const { showToast } = useToast()
  const [query, setQuery] = useState('')

  const [pendingDelete, setPendingDelete] = useState<Resource | null>(null)
  const [deleting, setDeleting] = useState(false)

  const [editing, setEditing] = useState<Resource | null>(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editType, setEditType] = useState<ResourceType>('template')
  const [saving, setSaving] = useState(false)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return resources
    return resources.filter((r) => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q))
  }, [resources, query])

  const openEdit = (resource: Resource) => {
    setEditing(resource)
    setEditTitle(resource.title)
    setEditDescription(resource.description)
    setEditType(resource.type)
  }

  const confirmDelete = async () => {
    if (!pendingDelete) return
    setDeleting(true)
    try {
      await deleteResource(pendingDelete)
      showToast(`"${pendingDelete.title}" was deleted.`, 'success')
    } catch {
      showToast('Failed to delete resource.', 'error')
    } finally {
      setDeleting(false)
      setPendingDelete(null)
    }
  }

  const saveEdit = async () => {
    if (!editing) return
    if (!editTitle.trim()) {
      showToast('Title is required.', 'error')
      return
    }
    setSaving(true)
    try {
      await updateResource(editing.id, {
        title: editTitle.trim(),
        description: editDescription.trim(),
        type: editType,
      })
      showToast(`"${editTitle.trim()}" updated.`, 'success')
      setEditing(null)
    } catch {
      showToast('Failed to update resource.', 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-lg font-bold text-white">Manage Resources</h2>
        <div className="relative w-full sm:max-w-xs">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" aria-hidden="true" />
          <Input
            id="resource-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title or description..."
            className="pl-9"
          />
        </div>
      </div>

      <ResourceGrid resources={filtered} loading={loading} isAdmin onDelete={setPendingDelete} onEdit={openEdit} />

      <Modal isOpen={!!pendingDelete} onClose={() => setPendingDelete(null)} title="Delete resource?">
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-3 rounded-lg border border-brand-danger/30 bg-brand-danger/10 p-4">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brand-danger" aria-hidden="true" />
            <p className="text-sm text-brand-muted">
              This will permanently delete "{pendingDelete?.title}". This action cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setPendingDelete(null)}>
              Cancel
            </Button>
            <Button variant="danger" isLoading={deleting} onClick={confirmDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit resource">
        <div className="flex flex-col gap-5">
          <Input
            id="edit-title"
            label="Title"
            required
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            placeholder="e.g. Summer Lookbook Template"
          />
          <Textarea
            id="edit-description"
            label="Description"
            rows={3}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            placeholder="A short description shown to shoppers..."
          />
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Type</span>
            <div className="flex flex-col gap-2 min-[420px]:flex-row" role="radiogroup" aria-label="Resource type">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  role="radio"
                  aria-checked={editType === opt.key}
                  onClick={() => setEditType(opt.key)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-bold uppercase transition-colors ${
                    editType === opt.key
                      ? 'border-brand-teal bg-brand-teal/10 text-brand-teal'
                      : 'border-white/15 text-brand-muted hover:text-white'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancel
            </Button>
            <Button isLoading={saving} onClick={saveEdit}>
              Save Changes
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
