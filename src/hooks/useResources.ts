import { useEffect, useState, useCallback } from 'react'
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from 'firebase/storage'
import { db, storage, isFirebaseConfigured } from '../firebase/config'
import type { Resource, ResourceType } from '../types'

interface UploadMeta {
  title: string
  description: string
  type: ResourceType
}

interface UseResourcesResult {
  resources: Resource[]
  loading: boolean
  error: string | null
  uploadResource: (file: File, meta: UploadMeta, onProgress: (pct: number) => void) => Promise<void>
  updateResource: (id: string, meta: Pick<Resource, 'title' | 'description' | 'type'>) => Promise<void>
  deleteResource: (resource: Resource) => Promise<void>
}

export function useResources(): UseResourcesResult {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!db) {
      setLoading(false)
      return
    }
    const resourcesQuery = query(collection(db, 'resources'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(
      resourcesQuery,
      (snapshot) => {
        setResources(
          snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() } as Resource)),
        )
        setLoading(false)
      },
      () => {
        setError('Unable to load resources right now.')
        setLoading(false)
      },
    )
    return unsubscribe
  }, [])

  const uploadResource = useCallback(
    async (file: File, meta: UploadMeta, onProgress: (pct: number) => void) => {
      if (!storage || !db || !isFirebaseConfigured) {
        throw new Error('Storage is not configured yet. Add Firebase credentials to enable uploads.')
      }
      const storagePath = `resources/${meta.type}/${Date.now()}-${file.name}`
      const storageRef = ref(storage, storagePath)
      const uploadTask = uploadBytesResumable(storageRef, file)

      await new Promise<void>((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
            onProgress(pct)
          },
          (err) => reject(err),
          () => resolve(),
        )
      })

      const fileUrl = await getDownloadURL(storageRef)

      await addDoc(collection(db, 'resources'), {
        title: meta.title,
        description: meta.description,
        type: meta.type,
        fileUrl,
        storagePath,
        fileName: file.name,
        sizeBytes: file.size,
        createdAt: Date.now(),
      })
    },
    [],
  )

  const deleteResource = useCallback(async (resource: Resource) => {
    if (!storage || !db) return
    await deleteObject(ref(storage, resource.storagePath)).catch(() => undefined)
    await deleteDoc(doc(db, 'resources', resource.id))
  }, [])

  const updateResource = useCallback(async (id: string, meta: Pick<Resource, 'title' | 'description' | 'type'>) => {
    if (!db) return
    await updateDoc(doc(db, 'resources', id), {
      title: meta.title,
      description: meta.description,
      type: meta.type,
    })
  }, [])

  return { resources, loading, error, uploadResource, updateResource, deleteResource }
}
