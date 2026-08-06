'use client'

import { useEffect, useState } from 'react'
import { FaFacebookF, FaX, FaInstagram, FaLinkedinIn, FaPinterestP, FaTelegramPlane, FaYoutube } from 'react-icons/fa'
import { getSocialLinks } from '@/lib/sanity'
import { FaX } from 'react-icons/fa6'

const platformConfig = {
    'Facebook': { icon: <FaFacebookF />, bg: '#3b5998' },
    'Twitter / X': { icon: <FaX/>, bg: '#1da1f2' },
    'Instagram': { icon: <FaInstagram />, bg: '#e1306c' },
    'LinkedIn': { icon: <FaLinkedinIn />, bg: '#0077b5' },
    'Pinterest': { icon: <FaPinterestP />, bg: '#e60023' },
    'Telegram': { icon: <FaTelegramPlane />, bg: '#0088cc' },
    'YouTube': { icon: <FaYoutube />, bg: '#ff0000' },
}

export default function SocialFloatBar() {
    const [socials, setSocials] = useState([])

    useEffect(() => {
        getSocialLinks().then(setSocials).catch(() => setSocials([]))
    }, [])

    if (socials.length === 0) return null

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col shadow-lg rounded-r-lg overflow-hidden">
            {socials.map((social) => {
                const config = platformConfig[social.platform] || { icon: null, bg: '#666' }
                return (

                    <a key={social._id}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={social.platform}
                        className="w-11 h-11 flex items-center justify-center text-white text-lg transition-all duration-300 hover:w-14 hover:brightness-110"
                        style={{ backgroundColor: config.bg }
                        }
                    >
                        {config.icon}
                    </a>
                )
            })}
        </div >
    )
}