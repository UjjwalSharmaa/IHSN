'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'E-Magazine', href: '/emagazine' },
    { name: 'Clientele', href: '/clientele' },
    { name: 'Social Media', href: '/social' },
    { name: 'Trade Exhibition', href: '/exhibitions' },
    { name: 'Contact Us', href: '/contact' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/">
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
                <ul className="hidden md:flex gap-6 items-center">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 text-sm"
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>

                {/* Hamburger button — mobile only */}
                <button
                    className="md:hidden text-gray-700"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
                <ul className="md:hidden bg-white px-4 pb-4 flex flex-col gap-3 shadow-md">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                className="block text-gray-700 hover:text-blue-600 font-medium py-1 border-b border-gray-100"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </nav>
    )
}