import { PageHeader } from '../components/common/PageHeader'
import { ResourceGrid } from '../components/downloads/ResourceGrid'
import { useResources } from '../hooks/useResources'

export function DownloadsPage() {
  const { resources, loading } = useResources()

  return (
    <>
      <PageHeader
        eyebrow="Free Resources"
        title="Templates, Images & PDFs"
        description="Download curated templates, images and guides shared by the THREDACT team — free for everyone, no account required."
      />
      <section className="py-16">
        <div className="container-page">
          <ResourceGrid resources={resources} loading={loading} />
        </div>
      </section>
    </>
  )
}
