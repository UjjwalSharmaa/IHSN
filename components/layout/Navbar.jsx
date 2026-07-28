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
    { name: 'Get In Touch', href: '/social' },
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

                {/* Hamburger button — mobile only */}
                <button
                    className="lg:hidden text-slate-800"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    {menuOpen ? <HiX size={26} /> : <HiMenu size={26} />}
                </button>
            </div>

            {/* Mobile menu */}
            {menuOpen && (
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
                </div>
            )}
        </nav>
    )
}