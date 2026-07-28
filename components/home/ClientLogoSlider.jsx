'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getHomeClients, urlFor } from '@/lib/sanity'

export default function ClientLogoSlider() {
    const [clients, setClients] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getHomeClients().then((data) => {
            setClients(data)
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    if (loading || clients.length === 0) return null

    // Duplicate the array so the scroll loop looks seamless
    const loopedClients = [...clients, ...clients]

    return (
        <section className="py-10 bg-white overflow-hidden border-b border-gray-100">
            <div className="relative w-full">
                <div className="flex animate-scroll gap-12 items-center w-max">
                    {loopedClients.map((client, i) => (
                        <div
                            key={`${client._id}-${i}`}
                            className="relative h-16 w-32 shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
                        >
                            <Image
                                src={urlFor(client.logo).width(200).url()}
                                alt={client.name}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
        </section>
    )
}