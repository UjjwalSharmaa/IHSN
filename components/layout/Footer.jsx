import Link from 'next/link'
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaWhatsapp,
    FaTelegram,
    FaYoutube,
    FaPinterestP,

} from 'react-icons/fa'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'E-Magazine', href: '/emagazine' },
    { name: 'Clientele', href: '/clientele' },
    { name: 'Social Media', href: '/social' },
    { name: 'Trade Exhibition', href: '/exhibitions' },
    { name: 'Contact Us', href: '/contact' },
]

const socialLinks = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaWhatsapp/>, href: '#' },
]

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10">

                {/* Column 1 — About */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">
                        IHSN
                    </h3>

                    <p className="text-sm leading-relaxed text-gray-400">
                        International Hub for Standards and Networking.
                        Connecting businesses and professionals across
                        trade exhibitions and industry events.
                    </p>
                </div>

                {/* Column 2 — Quick Links */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">
                        Quick Links
                    </h3>

                    <ul className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Column 3 — Contact + Social */}
                <div>
                    <h3 className="text-white text-lg font-semibold mb-3">
                        Get In Touch
                    </h3>

                    <p className="text-sm text-gray-400 mb-1">
                        📧 info@ihsn.in
                    </p>

                    <p className="text-sm text-gray-400 mb-4">
                        📞 +91 00000 00000
                    </p>

                    <div className="flex gap-3">
                        {socialLinks.map((s, i) => (
                            <a
                                key={i}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gray-700 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                            >
                                {s.icon}
                            </a>
                        ))}
                    </div>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="max-w-7xl mx-auto px-4 mt-10 pt-4 border-t border-gray-700 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} IHSN. All rights reserved. | ihsn.in
            </div>

        </footer>
    )
}