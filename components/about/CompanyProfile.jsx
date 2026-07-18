'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

// Placeholder data — will come from Sanity later
const companyData = {
    heading: 'Company Profile',
    paragraphs: [
        `IHSN (International Hub for Standards and Networking) was established with a
    vision to create a unified platform for businesses and professionals across
    various industries. Over the years, we have grown into a premier organization
    that facilitates meaningful connections and drives industry growth.`,
        `Our expertise spans across trade exhibitions, networking events, and industry
    publications. We have successfully organized hundreds of events bringing together
    thousands of professionals from across the globe. Our commitment to quality and
    excellence has made us a trusted name in the international trade community.`,
        `With our state-of-the-art facilities and experienced team, we continue to push
    the boundaries of what is possible in the world of trade and networking. Our
    mission is to empower businesses and professionals to achieve their full potential
    through meaningful connections and opportunities.`,
    ],
    image: '/images/company.jpg', // set to null to test text-only layout
}

export default function CompanyProfile() {
    const hasImage = companyData.image !== null

    return (
        <section className="py-16 px-4 bg-white">
            <div className="max-w-7xl mx-auto">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
                >
                    {companyData.heading}
                </motion.h2>

                <div className={`flex flex-col ${hasImage ? 'md:flex-row' : ''} gap-10 items-start`}>

                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        {companyData.paragraphs.map((para, i) => (
                            <p key={i} className="text-gray-600 leading-relaxed text-base mb-4">
                                {para}
                            </p>
                        ))}
                    </motion.div>

                    {/* Image — only renders if image exists */}
                    {hasImage && (
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={companyData.image}
                                    alt="Company"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </section>
    )
}