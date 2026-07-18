import UpcomingExhibitions from '@/components/exhibitions/UpcomingExhibition'
import ExhibitionGallerySection from '@/components/exhibitions/ExhibitionGallerySection'


export const metadata = {
    title: 'Trade Exhibitions',
    description: 'Upcoming trade exhibitions and past exhibition gallery',
}

export default function ExhibitionsPage() {
    return (
        <main>
            <UpcomingExhibitions />
            <ExhibitionGallerySection />
        </main>
    )
}