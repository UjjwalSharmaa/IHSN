'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { HiLogout } from 'react-icons/hi'

const FlipBook = dynamic(() => import('./Flipbook'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-80 flex items-center justify-center bg-gray-100 rounded-xl">
            <p className="text-gray-400">Loading magazine...</p>
        </div>
    ),
})

export default function MagazineViewer({ user, onLogout }) {
    const [magazines, setMagazines] = useState([])
    const [selected, setSelected] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        fetchMagazines()
    }, [])

    const fetchMagazines = async () => {
        try {
            const token = localStorage.getItem('ihsn_token')
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/magazine`, {
                headers: { Authorization: `Bearer ${token}` },
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message)
                setLoading(false)
                return
            }

            setMagazines(data)
            setLoading(false)
        } catch (err) {
            setError('Failed to load magazines')
            setLoading(false)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('ihsn_token')
        localStorage.removeItem('ihsn_user')
        onLogout()
    }

    return (
        <section className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">E-Magazine</h1>
                        <p className="text-gray-500 text-sm mt-1">
                            Welcome, {user.name} · Subscription valid until{' '}
                            {new Date(user.subscriptionExpiry).toLocaleDateString('en-IN')}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center p-2 bg-black rounded-md gap-2 text-sm text-white hover:text-red-700 font-medium transition"
                    >
                        <HiLogout size={18} />
                        Logout
                    </button>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="rounded-xl overflow-hidden shadow-sm">
                                <div className="w-full h-52 bg-gray-200 animate-pulse" />
                                <div className="p-3 flex flex-col gap-2">
                                    <div className="h-4 bg-gray-200 animate-pulse rounded" />
                                    <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {error && (
                    <p className="text-center text-red-500">{error}</p>
                )}

                {/* Flipbook viewer */}
                {selected && selected.pdfUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-12 bg-white rounded-2xl p-6 shadow-md"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">
                                {selected.title} — {selected.edition}
                            </h2>
                            <button
                                onClick={() => setSelected(null)}
                                className="text-sm text-gray-500 hover:text-gray-700"
                            >
                                ✕ Close
                            </button>
                        </div>
                        <FlipBook pdfUrl={selected.pdfUrl} title={selected.title} />
                    </motion.div>
                )}

                {/* Magazine grid */}
                {!loading && (
                    <>
                        {magazines.length === 0 ? (
                            <p className="text-center text-gray-400 mt-20">
                                No magazines available yet.
                            </p>
                        ) : (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                                {magazines.map((mag, i) => (
                                    <motion.div
                                        key={mag._id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.4, delay: i * 0.08 }}
                                        viewport={{ once: true }}
                                        onClick={() => mag.pdfUrl && setSelected(mag)}
                                        className={`bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${mag.pdfUrl ? 'cursor-pointer' : 'cursor-default'}`}
                                    >
                                        <div className="relative w-full h-52">
                                            <Image
                                                src={mag.thumbnailUrl}
                                                alt={mag.edition}
                                                fill
                                                className="object-cover"
                                            />
                                            {!mag.pdfUrl && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <span className="text-white text-xs font-medium">
                                                        Coming Soon
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-3">
                                            <p className="text-gray-800 font-semibold text-sm">
                                                {mag.edition}
                                            </p>
                                            <p className="text-gray-400 text-xs mt-0.5">
                                                {new Date(mag.publishedDate).toLocaleDateString('en-IN')}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </>
                )}

            </div>
        </section>
    )
}