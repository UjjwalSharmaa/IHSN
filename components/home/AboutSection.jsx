'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Placeholder data — will come from Sanity later
const aboutData = {
    heading: 'About IHSN',
    paragraph: `IHSN (International Hub for Standards and Networking) is a premier platform
  dedicated to connecting businesses, professionals, and industry leaders across
  trade exhibitions and networking events. We have been at the forefront of
  facilitating meaningful connections and driving industry growth for over two decades.
  Our commitment to excellence and innovation has made us a trusted name in the
  international trade community.`,
    emagazineThumbnail: '/images/Cover.jpg',
    emagazineTitle: 'Latest E-Magazine — Read Now',
}

export default function AboutSection() {
    return (
        <section className="py-16 px-14 bg-white">
            <div className="max-w-7xl mx-auto">

                {/* Section heading */}
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-10"
                >
                    {aboutData.heading}
                </motion.h2>

                <div className="flex flex-col md:flex-row gap-10 items-center">

                    {/* Left — paragraph */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                            {aboutData.paragraph}
                        </p>
                    </motion.div>

                    {/* Right — E-Magazine thumbnail */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1 flex flex-col items-center gap-4"
                    >
                        <Link href="/emagazine">
                            <div className="relative w-64 h-80 rounded-xl overflow-hidden shadow-xl hover:scale-105 transition-transform duration-300 cursor-pointer">
                                <Image
                                    src={aboutData.emagazineThumbnail}
                                    alt="E-Magazine"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </Link>
                        <Link
                            href="/emagazine"
                            className="text-blue-600 hover:text-red-600 border-2 p-2 rounded-md font-semibold text-sm transition-colors duration-200"
                        >
                            {aboutData.emagazineTitle}
                        </Link>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}