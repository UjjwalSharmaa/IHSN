'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP, FaTelegramPlane, FaYoutube } from 'react-icons/fa'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about', hasDropdown: false },
    { name: 'E Magazine', href: '/emagazine' },
    { name: 'Clientele', href: '/clientele' },
    { name: 'Trade Exhibition', href: '/exhibitions', hasDropdown: true },
    { name: 'Our Forms', href: '/contact', hasDropdown: true },
    { name: 'Get In Touch', href: '/contact', hasDropdown: true },
]

const socialIcons = [
    { icon: <FaFacebookF />, href: '#', color: '#3b5998' },
    { icon: <FaTwitter />, href: '#', color: '#1da1f2' },
    { icon: <FaInstagram />, href: '#', color: '#e1306c' },
    { icon: <FaLinkedinIn />, href: '#', color: '#0077b5' },
    { icon: <FaPinterestP />, href: '#', color: '#e60023' },
    { icon: <FaTelegramPlane />, href: '#', color: '#0088cc' },
    { icon: <FaYoutube />, href: '#', color: '#ff0000' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav
            className="fixed top-0 left-0 w-full z-50 shadow-md"
            style={{
                background: 'linear-gradient(180deg, #eef3f7 0%, #c9d6df 100%)',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="shrink-0">
                    <Image
                        src="/images/logo.png"
                        alt="IHSN Logo"
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="object-contain h-12 w-auto"
                    />
                </Link>

                {/* Desktop links */}
                <ul className="hidden lg:flex gap-6 items-center">
                    {navLinks.map((link, i) => (
                        <li key={link.name} className="relative group">
                            <Link
                                href={link.href}
                                className={`flex items-center gap-1 font-semibold text-sm transition-colors duration-200 ${i === 0
                                    ? 'text-red-500 hover:text-red-600'
                                    : 'text-slate-800 hover:text-blue-700'
                                    }`}
                            >
                                {link.name}
                                {link.hasDropdown && <HiChevronDown size={14} />}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Social icons — desktop */}
                <div className="hidden lg:flex items-center gap-2">
                    {socialIcons.map((s, i) => (

                       <a key = { i }
              href = { s.href }
              target = "_blank"
              rel = "noopener noreferrer"
              className = "w-7 h-7 rounded-full flex items-center justify-center text-xs border transition-transform duration-200 hover:scale-110"
              style = {{ color: s.color, borderColor: s.color }}
            >
                    {s.icon}
                </a>
          ))}
            </div>

            {/* Hamburger button — mobile only */}
            <button
                className="lg:hidden text-slate-800"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
        </div>

      {/* Mobile menu */ }
    {
        menuOpen && (
            <div className="lg:hidden bg-white px-4 pb-4 shadow-md">
                <ul className="flex flex-col gap-3">
                    {navLinks.map((link, i) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className={`block font-semibold py-1 border-b border-gray-100 ${i === 0 ? 'text-red-500' : 'text-slate-800'
                                    }`}
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className="flex items-center gap-3 mt-4">
                    {socialIcons.map((s, i) => (

                        <a key={i}
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 rounded-full flex items-center justify-center text-xs border"
                            style={{ color: s.color, borderColor: s.color }}
                        >
                            {s.icon}
                        </a>
                    ))}
                </div>
            </div >
        )
    }
    </nav >
  )
}