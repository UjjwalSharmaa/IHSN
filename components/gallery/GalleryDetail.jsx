'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { HiX, HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { getGalleryById, urlFor } from '@/lib/sanity'

export default function GalleryDetail({ id }) {
    const [gallery, setGallery] = useState(null)
    const [loading, setLoading] = useState(true)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        getGalleryById(id).then((data) => {
            setGallery(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [id])

    if (loading) {
        return (
            <section className="py-16 px-4 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    <div className="h-10 w-64 bg-gray-200 animate-pulse rounded mb-4" />
                    <div className="h-4 w-96 bg-gray-200 animate-pulse rounded mb-10" />
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {Array(8).fill(0).map((_, i) => (
                            <div key={i} className="h-48 rounded-xl bg-gray-200 animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (!gallery) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Gallery not found.</p>
            </div>
        )
    }

    const images = gallery.images || []

    const openLightbox = (index) => {
        setActiveIndex(index)
        setLightboxOpen(true)
    }

    const closeLightbox = () => setLightboxOpen(false)

    const goPrev = () => setActiveIndex((prev) =>
        prev === 0 ? images.length - 1 : prev - 1
    )

    const goNext = () => setActiveIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
    )

    return (
        <section className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-10"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                        {gallery.title}
                    </h1>
                    <p className="text-sm text-gray-400 mt-1">
                        {images.length} photos
                    </p>
                </motion.div>

                {images.length === 0 ? (
                    <p className="text-gray-400 text-center mt-20">
                        No photos in this gallery yet.
                    </p>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {images.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: (i % 4) * 0.08 }}
                                viewport={{ once: true }}
                                onClick={() => openLightbox(i)}
                                className="relative h-48 rounded-xl overflow-hidden shadow-sm cursor-pointer group"
                            >
                                <Image
                                    src={urlFor(img).width(400).url()}
                                    alt={`Photo ${i + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        View
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4"
                    >
                        <button
                            onClick={closeLightbox}
                            className="absolute top-4 right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
                        >
                            <HiX size={24} />
                        </button>

                        <button
                            onClick={goPrev}
                            className="absolute left-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
                        >
                            <HiChevronLeft size={28} />
                        </button>

                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="relative w-full max-w-4xl h-[70vh]"
                        >
                            <Image
                                src={urlFor(images[activeIndex]).width(1200).url()}
                                alt={`Photo ${activeIndex + 1}`}
                                fill
                                className="object-contain"
                            />
                        </motion.div>

                        <button
                            onClick={goNext}
                            className="absolute right-4 text-white bg-white/20 hover:bg-white/40 rounded-full p-2 transition"
                        >
                            <HiChevronRight size={28} />
                        </button>

                        <div className="absolute bottom-4 text-white/60 text-sm">
                            {activeIndex + 1} / {images.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}