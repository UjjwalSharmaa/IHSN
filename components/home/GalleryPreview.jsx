'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getHomeGalleries, urlFor } from '@/lib/sanity'

const placeholderGalleries = [
    { _id: '1', title: 'Trade Expo 2024', coverImage: null, images: [] },
    { _id: '2', title: 'Manufacturing Summit 2024', coverImage: null, images: [] },
    { _id: '3', title: 'Business Forum 2024', coverImage: null, images: [] },
    { _id: '4', title: 'Annual Meet 2024', coverImage: null, images: [] },
]

export default function GalleryPreview() {
    const [galleries, setGalleries] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getHomeGalleries().then((data) => {
            setGalleries(data.length > 0 ? data : placeholderGalleries)
            setLoading(false)
        }).catch(() => {
            setGalleries(placeholderGalleries)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <section className="py-16 px-4 bg-gray-50">
                <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-60 rounded-2xl bg-gray-200 animate-pulse" />
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Exhibition Gallery
                    </h2>
                    <p className="text-gray-500 text-base">
                        Relive our past exhibitions through photos
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {galleries.map((gallery, i) => (
                        <motion.div
                            key={gallery._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <Link href={`/gallery/${gallery._id}`}>
                                <div className="relative w-full h-60 rounded-2xl overflow-hidden shadow-md group cursor-pointer bg-gray-100">
                                    {gallery.coverImage ? (
                                        <Image
                                            src={urlFor(gallery.coverImage).width(400).url()}
                                            alt={gallery.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                                            <span className="text-5xl">🖼️</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-semibold text-base leading-snug">
                                            {gallery.title}
                                        </h3>
                                        <p className="text-white/70 text-xs mt-1">
                                            {gallery.images?.length || 0} photos
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-center mt-10"
                >
                    <Link
                        href="/exhibitions"
                        className="inline-block border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-200"
                    >
                        View All Galleries
                    </Link>
                </motion.div>

            </div>
        </section>
    )
}