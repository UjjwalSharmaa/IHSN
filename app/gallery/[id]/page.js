import GalleryDetail from '@/components/gallery/GalleryDetail'

export default async function GalleryPage({ params }) {
    const resolvedParams = await params
    const { id } = resolvedParams
    return (
        <main>
            <GalleryDetail id={id} />
        </main>
    )
}