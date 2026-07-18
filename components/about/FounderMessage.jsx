'use client'

import { motion } from 'framer-motion'
import { span } from 'framer-motion/client'
import Image from 'next/image'
import { FaQuoteLeft } from 'react-icons/fa'

const companyName ="Indian Hardware And Sanitary News(IHSN)"

const founderData = {
    heading: "Founder's Message",
    name: 'Mr. Rajesh Kumar',
    designation: 'Founder & Chairman, IHSN',
    message: [
        `When I founded ${companyName}, I had a simple vision — to create a platform where
    businesses could connect, grow, and thrive together. Over the years, that
    vision has evolved into something far greater than I could have imagined.`,
        `Today, ${companyName} stands as a testament to the power of collaboration and the
    strength of our community. We have brought together thousands of professionals,
    facilitated hundreds of partnerships, and created countless opportunities for
    growth and success.`,
        `As we look to the future, I am excited about the possibilities that lie ahead.
    We will continue to innovate, expand, and create new avenues for our members
    to connect and grow. Together, we will shape the future of international trade
    and networking.`,
    ],
    image: '/images/founder.jpg', // set to null to test text-only layout
}

export default function FounderMessage() {
    const hasImage = founderData.image !== null

    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-7xl mx-auto">

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-10"
                >
                    {founderData.heading}
                </motion.h2>

                <div className={`flex flex-col ${hasImage ? 'md:flex-row-reverse' : ''} gap-10 items-start`}>

                    {/* Image — only renders if image exists */}
                    {hasImage && (
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="flex-1"
                        >
                            <div className="relative w-full h-96 rounded-2xl overflow-hidden shadow-lg">
                                <Image
                                    src={founderData.image}
                                    alt={founderData.name}
                                    fill
                                    className="object-cover object-top"
                                />
                            </div>
                            <div className="mt-4 text-center">
                                <p className="text-gray-800 font-semibold text-lg">
                                    {founderData.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {founderData.designation}
                                </p>
                            </div>
                        </motion.div>
                    )}

                    {/* Message */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex-1"
                    >
                        <FaQuoteLeft className="text-blue-200 text-5xl mb-4" />
                        {founderData.message.map((para, i) => (
                            <p key={i} className="text-gray-600 leading-relaxed text-base mb-4 italic">
                                {para}
                            </p>
                        ))}
                        {!hasImage && (
                            <div className="mt-6">
                                <p className="text-gray-800 font-semibold text-lg">
                                    {founderData.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                    {founderData.designation}
                                </p>
                            </div>
                        )}
                    </motion.div>

                </div>
            </div>
        </section>
    )
}