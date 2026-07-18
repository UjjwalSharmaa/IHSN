'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaPinterest, FaYoutube, FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { BsTwitterX } from "react-icons/bs";
import { getSocialLinks } from '@/lib/sanity'

const platformConfig = {
    'Facebook': { icon: <FaFacebookF size={32} />, color: 'bg-blue-700', hover: 'hover:bg-blue-800', style: null },
    'Twitter': { icon: <BsTwitterX size={32} />, color: 'bg-black', hover: 'hover:bg-gray-900', style: null },
    'LinkedIn': { icon: <FaLinkedinIn size={32} />, color: 'bg-blue-900', hover: 'hover:bg-blue-800', style: null },
    'Instagram': { icon: <FaInstagram size={32} />, color: '', hover: '', style: { background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' } },
    'Pinterest': { icon: <FaPinterest size={32} />, color: 'bg-red-500', hover: 'hover:bg-red-600', style: null },
    'YouTube': { icon: <FaYoutube size={32} />, color: 'bg-red-600', hover: 'hover:bg-red-700', style: null },
    'Telegram': { icon: <FaTelegram size={32} />, color: "bg-blue-500", hover: 'hover:bg-blue-700', style: null },
    'WhatsApp': { icon: <FaWhatsapp size={32} />, color: "bg-green-500", hover: 'hover:bg-green-700', style: null },

}

const placeholderSocials = [
    { _id: '1', platform: 'WhatsApp', handle: '@IHSNDigital', description: 'Follow us on whatsapp for latest updates', link: "#" },
    { _id: '2', platform: 'Facebook', handle: '@IHSNOfficial', description: 'Follow us on Facebook for latest news and updates.', link: '#' },
    { _id: '3', platform: 'X / Twitter', handle: '@IHSN_Digital', description: 'Follow us for real time updates and industry insights.', link: '#' },
    { _id: '4', platform: 'YouTube', handle: 'IHSN TV', description: 'Event recordings and interviews.', link: '#' },
    { _id: '5', platform: 'LinkedIn', handle: 'IHSN International', description: 'Connect with us for professional networking.', link: '#' },
    { _id: '6', platform: 'Instagram', handle: '@ihsn_official', description: 'Behind the scenes photos and exhibition highlights.', link: '#' },
    { _id: '7', platform: 'Pinterest', handle: '@ihsn_official', description: 'Discover and save your favorite pins.', link: '#' },
    {
        _id: '8', platform: 'Telegram', handle: '@IhsnDigital', description: 'follow us on daily updates', link: '#'
    }
]

export default function SocialGrid() {
    const [socials, setSocials] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getSocialLinks().then((data) => {
            setSocials(data.length > 0 ? data : placeholderSocials)
            setLoading(false)
        }).catch(() => {
            setSocials(placeholderSocials)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return (
            <section className="py-16 px-4 bg-gray-50 min-h-screen">
                <div className="max-w-5xl mx-auto flex flex-col gap-6">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="h-24 rounded-2xl bg-gray-200 animate-pulse" />
                    ))}
                </div>
            </section>
        )
    }

    return (
        <section className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-5xl mx-auto">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Follow Us
                    </h1>
                    <p className="text-gray-500 text-base">
                        Stay connected with IHSN across all platforms
                    </p>
                </motion.div>

                <div className="flex flex-col gap-6">
                    {socials.map((social, i) => {
                        const config = platformConfig[social.platform] || {
                            icon: null,
                            color: 'bg-gray-600',
                            hover: 'hover:bg-gray-700',
                            style: null,
                        }

                        return (
                            <motion.a
                                key={social._id}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ opacity: 0, x: -40 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                style={config.style || {}}
                                className={`flex items-center gap-6 ${config.style ? '' : config.color} ${config.style ? '' : config.hover} text-white rounded-2xl p-6 shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
                            >
                                <div className="bg-white/20 rounded-full p-4 shrink-0">
                                    {config.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold mb-1">{social.platform}</h3>
                                    <p className="text-white/80 text-sm font-medium mb-1">{social.handle}</p>
                                    <p className="text-white/70 text-sm hidden md:block">{social.description}</p>
                                </div>
                                <div className="text-white/60 text-2xl shrink-0">→</div>
                            </motion.a>
                        )
                    })}
                </div>

            </div>
        </section>
    )
}