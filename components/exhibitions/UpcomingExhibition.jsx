'use client'

import { motion } from "framer-motion";
import Image from "next/image";
import { HiLocationMarker, HiCalendar, HiExternalLink } from 'react-icons/hi'

const exhibitions = [
    {
        id: 1,
        title: 'International Trade Expo 2026',
        location: 'Pragati Maidan, New Delhi',
        date: 'January 15–18, 2026',
        details: `A premier trade exhibition bringing together industry leaders,
    innovators and businesses from across the globe. Features over 500 exhibitors
    across 20 industry sectors with live demonstrations and networking sessions.`,
        image: '/images/expo1.jpg',
        link: 'https://google.com',
        showOnHome: true,
    },
    {
        id: 2,
        title: 'Global Manufacturing Summit',
        location: 'MMRDA Grounds, Mumbai',
        date: 'February 5–7, 2026',
        details: `The largest manufacturing summit in South Asia featuring cutting edge
    technology showcases, panel discussions with industry experts and exclusive
    B2B networking opportunities for manufacturers and suppliers.`,
        image: '/images/expo2.jpg',
        link: 'https://google.com',
        showOnHome: true,
    },
    {
        id: 3,
        title: 'South Asia Business Forum',
        location: 'BIEC, Bengaluru',
        date: 'March 10–12, 2026',
        details: `An exclusive forum for business leaders across South Asia to discuss
    emerging opportunities, trade policies and cross border collaboration. Limited
    seats available for this invitation only event.`,
        image: '/images/expo3.jpg',
        link: 'https://google.com',
        showOnHome: false,
    },
    {
        id: 4,
        title: 'East India Trade Connect',
        location: 'Eco Park, Kolkata',
        date: 'April 20–22, 2026',
        details: `Connecting businesses across Eastern India with global markets.
    Features textile, handicraft, agriculture and technology sectors with
    special focus on export opportunities and government schemes.`,
        image: '/images/expo1.jpg',
        link: 'https://google.com',
        showOnHome: false,
    },
]

export default function upcomingExhibitions() {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Upcoming Exhibitions
                    </h2>
                    <p className="text-gray-500 text-base">
                        Plan your visit to our upcoming trade exhibitions
                    </p>
                </motion.div>

                {/* Exhibition list */}
                <div className="flex flex-col gap-10">
                    {exhibitions.map((expo, i) => (
                        <motion.div
                            key={expo.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 items-center bg-gray-50 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300`}
                        >
                            {/* Image */}
                            <div className="relative w-full md:w-2/5 h-64 shrink-0">
                                <Image
                                    src={expo.image}
                                    alt={expo.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="flex-1 p-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-3">
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

                                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                    {expo.details}
                                </p>

                                <div className="flex items-center gap-4">
                                    <a
                                        href={expo.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
                                    >
                                        Know More
                                        <HiExternalLink />
                                    </a>

                                    {/* Home badge */}
                                    {expo.showOnHome && (
                                        <span className="text-xs bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full">
                                            Featured on Home
                                        </span>
                                    )}
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>

            </div>
        </section >
    )
}