import ClientGrid from '@/components/clientele/ClientGrid'

export const metadata = {
    title: 'Clientele',
    description: 'Trusted by hundreds of businesses across the globe',
}

export default function ClientelePage() {
    return (
        <main>
            <ClientGrid />
        </main>
    )
}