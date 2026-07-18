'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getHomeExhibitions, urlFor } from '@/lib/sanity'
import { HiLocationMarker, HiCalendar } from 'react-icons/hi'

const placeholderExhibitions = [
    {
        _id: '1',
        title: 'International Trade Expo 2026',
        location: 'Pragati Maidan, New Delhi',
        date: 'January 15–18, 2026',
        image: null,
        link: '#',
    },
    {
        _id: '2',
        title: 'Global Manufacturing Summit',
        location: 'MMRDA Grounds, Mumbai',
        date: 'February 5–7, 2026',
        image: null,
        link: '#',
    },
    {
        _id: '3',
        title: 'South Asia Business Forum',
        location: 'BIEC, Bengaluru',
        date: 'March 10–12, 2026',
        image: null,
        link: '#',
    },
]

export default function ExhibitionPreview() {
    const [exhibitions, setExhibitions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getHomeExhibitions().then((data) => {
            setExhibitions(data.length > 0 ? data : placeholderExhibitions)
            setLoading(false)
        }).catch(() => {
            setExhibitions(placeholderExhibitions)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <section className="py-16 px-4 bg-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="rounded-2xl overflow-hidden shadow-md">
                            <div className="w-full h-52 bg-gray-200 animate-pulse" />
                            <div className="p-5 flex flex-col gap-2">
                                <div className="h-5 bg-gray-200 animate-pulse rounded" />
                                <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Upcoming Trade Exhibitions
                    </h2>
                    <p className="text-gray-500 text-base">
                        Explore our upcoming events and plan your visit
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {exhibitions.map((expo, i) => (
                        <motion.div
                            key={expo._id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            viewport={{ once: true }}
                            className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                                {expo.image ? (
                                    <Image
                                        src={urlFor(expo.image).width(600).url()}
                                        alt={expo.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                                        <span className="text-5xl">🏛️</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-all duration-300" />
                            </div>

                            <div className="p-5 bg-white">
                                <h3 className="text-gray-800 font-semibold text-lg mb-3 leading-snug">
                                    {expo.title}
                                </h3>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-2">
                                    <HiLocationMarker className="text-blue-500 shrink-0" />
                                    <span>{expo.location}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
                                    <HiCalendar className="text-blue-500 shrink-0" />
                                    <span>{expo.date}</span>
                                </div>
                                {expo.link && (
                                    <a
                                        href={expo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors duration-200"
                                    >
                                        Know More
                                    </a>
                                )}
                            </div>
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
                        View All Exhibitions
                    </Link>
                </motion.div>

            </div>
        </section >
    )
}