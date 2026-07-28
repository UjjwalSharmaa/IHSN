import NewsSection from '@/components/home/NewsSection'

export const metadata = {
  title: 'News and Events',
  description: 'Latest news and events from IHSN',
}

export default function NewsPage() {
  return (
    <main className="pt-8">
      <NewsSection />
    </main>
  )
}