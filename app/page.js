import Image from "next/image";
import HomeSlider from '@/components/home/HomeSlider'
import AboutSection from '@/components/home/AboutSection'
import NewsSection from '@/components/home/NewsSection'
import ExhibitionPreview from '@/components/home/ExhibitionPreview'
import GalleryPreview from "@/components/home/GalleryPreview";
import SubscriptionForm from "@/components/forms/SubscriptionForm";

export default function Home() {
  return (
    <main>
        <HomeSlider />
        <AboutSection />
        <NewsSection />
        <ExhibitionPreview/>
        <GalleryPreview/>
        <SubscriptionForm/>
    </main>
  );
}
