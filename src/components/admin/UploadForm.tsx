import { useRef, useState, type DragEvent, type FormEvent } from 'react'
import { UploadCloud, FileType2, Image as ImageIcon, FileText } from 'lucide-react'
import { Input, Textarea } from '../ui/Input'
import { Button } from '../ui/Button'
import { ProgressBar } from '../ui/ProgressBar'
import { useResources } from '../../hooks/useResources'
import { useToast } from '../../context/ToastContext'
import type { ResourceType } from '../../types'

const TYPE_OPTIONS: { key: ResourceType; label: string; icon: typeof FileType2; accept: string }[] = [
  { key: 'template', label: 'Template', icon: FileType2, accept: '.zip,.fig,.sketch,.psd,.ai' },
  { key: 'image', label: 'Image', icon: ImageIcon, accept: 'image/*' },
  { key: 'pdf', label: 'PDF', icon: FileText, accept: '.pdf' },
]

export function UploadForm() {
  const { uploadResource } = useResources()
  const { showToast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [type, setType] = useState<ResourceType>('template')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [progress, setProgress] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const activeOption = TYPE_OPTIONS.find((opt) => opt.key === type)!

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = e.dataTransfer.files?.[0]
    if (dropped) setFile(dropped)
  }

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setFile(null)
    setProgress(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    if (!file) {
      setError('Please select a file to upload.')
      return
    }
    try {
      setProgress(0)
      await uploadResource(file, { title, description, type }, setProgress)
      showToast(`"${title}" uploaded successfully.`, 'success')
      resetForm()
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Upload failed. Please try again.'
      setError(message)
      showToast(message, 'error')
      setProgress(null)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
      <h2 className="font-heading text-lg font-bold text-white">Upload a Resource</h2>

      <div className="flex flex-col gap-2 min-[420px]:flex-row" role="radiogroup" aria-label="Resource type">
        {TYPE_OPTIONS.map((opt) => (
          <button
            key={opt.key}
            type="button"
            role="radio"
            aria-checked={type === opt.key}
            onClick={() => setType(opt.key)}
            className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-xs font-bold uppercase transition-colors ${
              type === opt.key
                ? 'border-brand-teal bg-brand-teal/10 text-brand-teal'
                : 'border-white/15 text-brand-muted hover:text-white'
            }`}
          >
            <opt.icon size={15} aria-hidden="true" />
            {opt.label}
          </button>
        ))}
      </div>

      <Input
        id="resource-title"
        label="Title"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="e.g. Summer Lookbook Template"
      />
      <Textarea
        id="resource-description"
        label="Description"
        rows={3}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="A short description shown to shoppers..."
      />

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-brand-muted">
          File
        </label>
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          role="button"
          tabIndex={0}
          aria-label="Choose or drop a file to upload"
          className={`flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors ${
            isDragging ? 'border-brand-teal bg-brand-teal/5' : 'border-white/15 hover:border-white/30'
          }`}
        >
          <UploadCloud size={26} className="text-brand-teal" aria-hidden="true" />
          <p className="max-w-full break-words text-sm text-brand-muted">
            {file ? file.name : `Drag & drop or click to select a ${activeOption.label.toLowerCase()}`}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept={activeOption.accept}
            className="hidden"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>
      </div>

      {progress !== null && <ProgressBar progress={progress} />}
      {error && (
        <p role="alert" className="text-sm text-brand-danger">
          {error}
        </p>
      )}

      <Button type="submit" isLoading={progress !== null && progress < 100} className="w-full">
        Upload Resource
      </Button>
    </form>
  )
}
