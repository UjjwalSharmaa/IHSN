'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { HiMenu, HiX, HiChevronDown } from 'react-icons/hi'

const navLinks = [
    { name: 'Home', href: '/' },
    {
        name: 'About Us',
        href: '/about/company-profile',
        dropdown: [
            { name: 'Company Profile', href: '/about/company-profile' },
            { name: "Founder's Message", href: '/about/founder-message' },
        ],
    },
    { name: 'E Magazine', href: '/emagazine' },
    { name: 'Social Media Platforms', href: '/social' },
    { name: 'Clientele', href: '/clientele' },
    {
        name: 'Trade Exhibition',
        href: '/exhibitions/news',
        dropdown: [
            { name: 'News and Events', href: '/exhibitions/news' },
            { name: 'Exhibition Gallery', href: '/exhibitions/gallery' },
            { name: 'Trade Show Calendar', href: '/exhibitions/calendar' },
        ],
    },
    {
        name: 'Our Forms',
        href: '/contact',
        dropdown: [
            { name: 'Contact Form', href: '/contact' },
            { name: 'Subscription Form', href: '/contact' },
        ],
    },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [mobileDropdown, setMobileDropdown] = useState(null)

    return (
        <nav
            className="fixed top-0 left-0 w-full z-50 shadow-md"
            style={{
                background: 'linear-gradient(180deg, #f5f7f9 0%, #e2e8ee 35%, #b8c4cf 65%, #8fa0ae 100%)',
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
                                className={`flex items-center gap-1 font-semibold text-sm transition-colors duration-200 cursor-pointer ${i === 0
                                    ? 'text-red-500 hover:text-red-600'
                                    : 'text-slate-800 hover:text-blue-700'
                                    }`}
                            >
                                {link.name}
                                {link.dropdown && <HiChevronDown size={14} />}
                            </Link>

                            {link.dropdown && (
                                <ul className="absolute left-0 top-full mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 z-50">
                                    {link.dropdown.map((subLink) => (
                                        <li key={subLink.name}>
                                            <Link
                                                href={subLink.href}
                                                className="block px-4 py-2 text-sm text-slate-800 hover:bg-blue-100 hover:text-blue-700 cursor-pointer"
                                            >
                                                {subLink.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Enquire Now button — desktop */}

                <a href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20an%20enquiry%20regarding%20IHSN"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden lg:inline-flex relative items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg group/btn"
                >
                    <span className="absolute inset-0 bg-white/20 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 skew-x-12" />
                    <svg className="relative w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.84L2 22l5.35-1.36c1.4.76 3 1.19 4.69 1.19 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.5 0-2.91-.4-4.14-1.11l-.3-.17-3.08.78.82-3-.2-.31a8.14 8.14 0 01-1.25-4.43c0-4.51 3.67-8.18 8.18-8.18s8.18 3.67 8.18 8.18-3.67 8.24-8.21 8.24z" />
                    </svg>
                    <span className="relative">Enquire Now</span>
                </a>

                {/* Hamburger button — mobile only */}
                <button
                    className="lg:hidden text-slate-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Mobile menu */}
            {
                menuOpen && (
                    <div className="lg:hidden bg-white px-4 pb-4 shadow-md max-h-[80vh] overflow-y-auto">
                        <ul className="flex flex-col gap-1">
                            {navLinks.map((link, i) => (
                                <li key={link.name}>
                                    <div className="flex items-center justify-between">
                                        <Link
                                            href={link.href}
                                            className={`block font-semibold py-2 flex-1 ${i === 0 ? 'text-red-500' : 'text-slate-800'}`}
                                            onClick={() => !link.dropdown && setMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                        {link.dropdown && (
                                            <button
                                                onClick={() =>
                                                    setMobileDropdown(mobileDropdown === link.name ? null : link.name)
                                                }
                                                className="p-2"
                                            >
                                                <HiChevronDown
                                                    size={16}
                                                    className={`transition-transform ${mobileDropdown === link.name ? 'rotate-180' : ''}`}
                                                />
                                            </button>
                                        )}
                                    </div>

                                    {link.dropdown && mobileDropdown === link.name && (
                                        <ul className="pl-4 flex flex-col gap-1 pb-2">
                                            {link.dropdown.map((subLink) => (
                                                <li key={subLink.name}>
                                                    <Link
                                                        href={subLink.href}
                                                        className="block py-1.5 text-sm text-slate-600"
                                                        onClick={() => setMenuOpen(false)}
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="border-b border-gray-100" />
                                </li>
                            ))}
                        </ul>

                        <a href="https://wa.me/919999999999?text=Hi%2C%20I%20have%20an%20enquiry%20regarding%20IHSN"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 bg-green-600 text-white font-semibold text-sm px-5 py-3 rounded-full mt-3"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.39 1.26 4.84L2 22l5.35-1.36c1.4.76 3 1.19 4.69 1.19 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.15c-1.5 0-2.91-.4-4.14-1.11l-.3-.17-3.08.78.82-3-.2-.31a8.14 8.14 0 01-1.25-4.43c0-4.51 3.67-8.18 8.18-8.18s8.18 3.67 8.18 8.18-3.67 8.24-8.21 8.24z" />
                            </svg>
                            Enquire Now
                        </a>
                    </div>
                )
            }
        </nav >
    )
}