'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getSiteSettings, urlFor } from '@/lib/sanity'

export default function Header() {
    const [settings, setSettings] = useState(null)

    useEffect(() => {
        getSiteSettings().then(setSettings)
    }, [])

    if (!settings) return null

    return (
        <div className="w-full bg-white border-b border-gray-100 py-2">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {settings.logoLeft && (
                    <Image
                        src={urlFor(settings.logoLeft).width(200).url()}
                        alt="Logo Left"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-14 w-auto object-contain"
                    />
                )}
                {settings.logoRight && (
                    <Image
                        src={urlFor(settings.logoRight).width(200).url()}
                        alt="Logo Right"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-14 w-auto object-contain"
                    />
                )}
            </div>
        </div>
    )
}