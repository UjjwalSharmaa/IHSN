'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { getClients, urlFor } from '@/lib/sanity'

export default function ClientGrid() {
    const [clients, setClients] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getClients().then((data) => {
            setClients(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const filtered = clients.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) {
        return (
            <section className="py-16 px-4 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {Array(12).fill(0).map((_, i) => (
                        <div key={i} className="h-28 rounded-xl bg-gray-200 animate-pulse" />
                    ))}
                </div>
            </section>
        )
    }

    function ClientCard({ client, index }) {
        const cardContent = (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: (index % 6) * 0.08 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-100 rounded-xl p-4 flex items-center justify-center shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 h-28"
            >
                <div className="relative w-full h-full">
                    <Image
                        src={urlFor(client.logo).width(200).url()}
                        alt={client.name}
                        fill
                        className="object-contain p-2"
                    />
                </div>
            </motion.div>
        )

        if (client.link) {
            return (
                <a href={client.link} target="_blank" rel="noopener noreferrer" title={client.name}>
                    {cardContent}
                </a>
            )
        }
        return <div title={client.name}>{cardContent}</div>
    }

    return (
        <section className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Our Clientele
                    </h1>
                    <p className="text-gray-500 text-base">
                        Trusted by hundreds of businesses across the globe
                    </p>
                </motion.div>

                <div className="max-w-md mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full border border-gray-300 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <p className="text-center text-gray-400 text-sm mb-8">
                    Showing {filtered.length} of {clients.length} clients
                </p>

                {clients.length === 0 ? (
                    <p className="text-center text-gray-400 mt-20">
                        No clients added yet. Add some in the CMS.
                    </p>
                ) : filtered.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {filtered.map((client, i) => (
                            <ClientCard key={client._id} client={client} index={i} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-400 mt-20">
                        No clients found matching {`"${search}"`}.
                    </p>
                )}

            </div>
        </section>
    )
}