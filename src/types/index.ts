export type ResourceType = 'template' | 'image' | 'pdf'
export type ResourceFilter = 'all' | ResourceType

export interface Resource {
  id: string
  title: string
  description: string
  type: ResourceType
  fileUrl: string
  storagePath: string
  fileName: string
  sizeBytes: number
  createdAt: number
}

export type TemplateFormat = 'Canva' | 'PSD' | 'AI' | 'PDF' | 'FIG'

export interface TemplateItem {
  id: string
  title: string
  description: string
  format: TemplateFormat
  imageUrl?: string
}

export interface AdminUser {
  uid: string
  email: string | null
}

export interface CategoryItem {
  id: string
  name: string
  description: string
  galleryUrl: string
  templates: TemplateItem[]
}

export interface ServiceItem {
  id: string
  title: string
  description: string
}

export interface NavItem {
  label: string
  path: string
}
