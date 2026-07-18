'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getNewsEvents, urlFor } from '@/lib/sanity'

// Fallback placeholder data
const placeholderNews = [
  {
    _id: '1',
    title: 'IHSN Annual Trade Summit 2025',
    date: '2025-12-15',
    excerpt: 'Join us for the biggest trade summit of the year featuring industry leaders from across the globe.',
    image: null,
    link: '#',
  },
  {
    _id: '2',
    title: 'New E-Magazine Edition Released',
    date: '2025-11-28',
    excerpt: 'Our latest edition covers emerging trends in international trade and networking opportunities.',
    image: null,
    link: '#',
  },
  {
    _id: '3',
    title: 'Exhibition Gallery Updated',
    date: '2025-11-10',
    excerpt: 'Photos from our recent trade exhibitions are now available in the gallery section.',
    image: null,
    link: '#',
  },
]

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNewsEvents().then((data) => {
      setNewsItems(data.length > 0 ? data : placeholderNews)
      setLoading(false)
    }).catch(() => {
      setNewsItems(placeholderNews)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-md">
              <div className="w-full h-48 bg-gray-200 animate-pulse" />
              <div className="p-5 flex flex-col gap-2">
                <div className="h-3 bg-gray-200 animate-pulse rounded w-1/3" />
                <div className="h-5 bg-gray-200 animate-pulse rounded" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
              </div>
            </div>
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
            News & Events
          </h2>
          <p className="text-gray-500 text-base">
            Stay updated with the latest from IHSN
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative w-full h-48 bg-gray-100">
                {item.image ? (
                  <Image
                    src={urlFor(item.image).width(600).url()}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                    <span className="text-blue-300 text-4xl">📰</span>
                  </div>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs text-blue-500 font-medium mb-2">
                  {new Date(item.date).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <h3 className="text-gray-800 font-semibold text-lg mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {item.excerpt}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors duration-200"
                  >
                    Read More →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}