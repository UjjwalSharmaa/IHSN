'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

// Placeholder data — will come from Sanity later
const aboutData = {
  heading1: 'WELCOME TO',
  heading2: 'INDIAN HARDWARE & SANITARY NEWS',
  quote: `"Indian Hardware & Sanitary News" is a single trade monthly magazine which creates, manages and delivers the information that trading partners need to meet and do business.`,
  paragraphs: [
    `We provide the right information, at the right time, in the right format. Our magazine is India's first leading and widely circulated monthly magazine of the builders, hardware, sanitary trade and allied industry since 1994.`,
    `Our magazine circulated among Manufacturers, Exporters, Importers, Wholesalers, Distributors, Traders, Architectures, Builders Contractors & Interior Designers etc. Our each issue has become a wider mirror of Indian trade & industry.`,
    `Our monthly publication carries all the required information along with latest, attractive printout in an increased number of pages to serve your purpose. Most of our subscribers keen to receive details about you and your products.`,
  ],
  emagazineThumbnail: '/images/emagazine-thumb.jpg',
  emagazineIssue: 'SEPTEMBER-2025, ISSUE NO. 314',
}

export default function AboutSection() {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-12">

          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1"
          >
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
              {aboutData.heading1}
            </h2>
            <h2 className="text-2xl md:text-3xl font-extrabold text-red-600 leading-tight mb-6">
              {aboutData.heading2}
            </h2>

            <div className="border-l-4 border-red-600 bg-gray-100 px-5 py-4 mb-6">
              <p className="italic text-red-600 text-sm md:text-base leading-relaxed">
                {aboutData.quote}
              </p>
            </div>

            {aboutData.paragraphs.map((para, i) => (
              <p key={i} className="text-gray-500 text-sm md:text-base leading-relaxed mb-4">
                {para}
              </p>
            ))}

            <Link
              href="/about/company-profile"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-semibold text-sm px-6 py-2.5 rounded transition-colors duration-200"
            >
              READ MORE
            </Link>
          </motion.div>

          {/* Right column — E-Magazine */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="w-full md:w-72 shrink-0 flex flex-col items-center"
          >
            <h3 className="text-xl font-extrabold mb-4">
              <span className="text-slate-900">E </span>
              <span className="text-red-600">MAGAZINE</span>
            </h3>

            <Link href="/emagazine">
              <div className="relative w-64 h-80 border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer">
                <Image
                  src={aboutData.emagazineThumbnail}
                  alt="E-Magazine"
                  fill
                  className="object-cover"
                />
              </div>
            </Link>

            <div className="mt-4 bg-red-600 text-white text-xs font-semibold text-center px-4 py-2 w-64">
              {aboutData.emagazineIssue}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}