import HomeSlider from '@/components/home/HomeSlider'
import ClientLogoSlider from '@/components/home/ClientLogoSlider'
import AboutSection from '@/components/home/AboutSection'
import NewsSection from '@/components/home/NewsSection'
import ExhibitionPreview from '@/components/home/ExhibitionPreview'
import GalleryPreview from "@/components/home/GalleryPreview";
import SubscriptionForm from "@/components/forms/SubscriptionForm";
import SocialFloatBar from '@/components/layout/SocialFloatBar'

export default function Home() {
  return (
    <main>
        <SocialFloatBar />
        <HomeSlider />
        <ClientLogoSlider />
        <AboutSection />
        <NewsSection />
        <ExhibitionPreview/>
        <GalleryPreview/>
        <SubscriptionForm/>
    </main>
  );
}