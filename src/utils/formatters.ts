import type { ResourceType } from '../types'

export function formatFileSize(bytes: number): string {
  if (bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB']
  const exponent = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1)
  const value = bytes / Math.pow(1024, exponent)
  return `${value.toFixed(exponent === 0 ? 0 : 1)} ${units[exponent]}`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  template: 'Template',
  image: 'Image',
  pdf: 'PDF',
}

export function getResourceTypeLabel(type: ResourceType): string {
  return RESOURCE_TYPE_LABELS[type]
}
