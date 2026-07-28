import ExhibitionGallerySection from '@/components/exhibitions/ExhibitionGallerySection'

export const metadata = {
  title: 'Exhibition Gallery',
  description: 'Browse photos from past IHSN exhibitions',
}

export default function ExhibitionGalleryPage() {
  return (
    <main>
      <ExhibitionGallerySection />
    </main>
  )
}