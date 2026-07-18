import CompanyProfile from '@/components/about/CompanyProfile'
import FounderMessage from '@/components/about/FounderMessage';

export const metadata={
    title: 'About Us',
    description: 'Learn about Indian Hardware & Sanitary News, our mission, vision, and the team behind the leading trade publication in the hardware and sanitary industry.',
}

export default function About() {
    return(
        <main>
            <CompanyProfile/>
            <FounderMessage/>
        </main>
    )
}