'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Placeholder data — will come from Sanity later
// Admin controls which galleries show on home page via showOnHome
const galleries = [
    {
        id: 1,
        title: 'Trade Expo 2024',
        coverImage: '/images/gallery1.jpg',
        photoCount: 24,
        showOnHome: true,
    },
    {
        id: 2,
        title: 'Manufacturing Summit 2024',
        coverImage: '/images/gallery2.jpg',
        photoCount: 18,
        showOnHome: true,
    },
    {
        id: 3,
        title: 'Business Forum 2024',
        coverImage: '/images/gallery3.jpg',
        photoCount: 32,
        showOnHome: false,
    },
    {
        id: 4,
        title: 'Annual Meet 2024',
        coverImage: '/images/gallery4.jpg',
        photoCount: 15,
        showOnHome: true,
    },
    {
        id: 5,
        title: 'South Asia Summit 2023',
        coverImage: '/images/gallery1.jpg',
        photoCount: 28,
        showOnHome: false,
    },
    {
        id: 6,
        title: 'Export Connect 2023',
        coverImage: '/images/gallery2.jpg',
        photoCount: 20,
        showOnHome: false,
    },
]

export default function ExhibitionGallerySection() {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-4"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Exhibition Gallery
                    </h2>
                    <p className="text-gray-500 text-base mb-2">
                        Browse photos from our past exhibitions
                    </p>
                    <p className="text-xs text-gray-400">
                        ✦ Galleries marked green are visible on the home page
                    </p>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
                    {galleries.map((gallery, i) => (
                        <motion.div
                            key={gallery.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <Link href={`/gallery/${gallery.id}`}>
                                <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-md group cursor-pointer">
                                    <Image
                                        src={gallery.coverImage}
                                        alt={gallery.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                    />

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300" />

                                    {/* Text */}
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <h3 className="text-white font-semibold text-base">
                                            {gallery.title}
                                        </h3>
                                        <p className="text-white/70 text-xs mt-1">
                                            {gallery.photoCount} photos
                                        </p>
                                    </div>

                                    {/* Home badge */}
                                    {gallery.showOnHome && (
                                        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                            On Home
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}