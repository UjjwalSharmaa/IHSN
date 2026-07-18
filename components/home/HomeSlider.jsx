'use client'

import { useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Image from 'next/image'
import { getSliderImages, urlFor } from '@/lib/sanity'

export default function HomeSlider() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [slides, setSlides] = useState([])
    const [loading, setLoading] = useState(true)

    // Fetch slides from Sanity
    useEffect(() => {
        getSliderImages().then((data) => {
            setSlides(data)
            setLoading(false)
        })
    }, [])

    // Auto scroll every 4 seconds
    useEffect(() => {
        if (!emblaApi) return
        const interval = setInterval(() => {
            emblaApi.scrollNext()
        }, 4000)
        return () => clearInterval(interval)
    }, [emblaApi])

    // Track current slide for dots
    useEffect(() => {
        if (!emblaApi) return
        emblaApi.on('select', () => {
            setSelectedIndex(emblaApi.selectedScrollSnap())
        })
    }, [emblaApi])

    if (loading) {
        return (
            <div className="w-full h-[500px] md:h-[600px] bg-gray-200 animate-pulse" />
        )
    }

    if (slides.length === 0) {
        return (
            <div className="w-full h-[500px] md:h-[600px] bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">No slides added yet</p>
            </div>
        )
    }

    return (
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">

            {/* Slider viewport */}
            <div className="overflow-hidden h-full" ref={emblaRef}>
                <div className="flex h-full">
                    {slides.map((slide) => (
                        <div
                            key={slide._id}
                            className="relative flex-none w-full h-full"
                        >
                            <Image
                                src={urlFor(slide.image).width(1400).url()}
                                alt={slide.title || 'Slide'}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => emblaApi && emblaApi.scrollTo(i)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${i === selectedIndex ? 'bg-white scale-125' : 'bg-white/50'
                            }`}
                    />
                ))}
            </div>

            {/* Prev / Next arrows */}
            <button
                onClick={() => emblaApi && emblaApi.scrollPrev()}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
            >
                ‹
            </button>
            <button
                onClick={() => emblaApi && emblaApi.scrollNext()}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-2 transition"
            >
                ›
            </button>

        </section>
    )
}