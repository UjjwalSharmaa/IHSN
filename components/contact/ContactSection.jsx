'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiPhone, HiMail, HiLocationMarker } from 'react-icons/hi'

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    })
    const [status, setStatus] = useState('idle')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        
        
        setTimeout(() => {
            setStatus('success')
            setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
        }, 1500)
    }

    return (
        <section className="py-16 px-4 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                        Contact Us
                    </h1>
                    <p className="text-gray-500 text-base">
                        Get in touch with us we love to hear from you
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

                    {/* Left — contact info + map */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:col-span-1 flex flex-col gap-6"
                    >
                        {/* Info cards */}
                        {[
                            {
                                icon: <HiPhone className="text-blue-600" size={22} />,
                                label: 'Phone',
                                value: '+91 00000 00000',
                            },
                            {
                                icon: <HiMail className="text-blue-600" size={22} />,
                                label: 'Email',
                                value: 'info@ihsn.in',
                            },
                            {
                                icon: <HiLocationMarker className="text-blue-600" size={22} />,
                                label: 'Address',
                                value: '123 Trade Center, Connaught Place, New Delhi - 110001',
                            },
                        ].map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm"
                            >
                                <div className="bg-blue-50 rounded-full p-2 shrink-0">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400 font-medium mb-0.5">
                                        {item.label}
                                    </p>
                                    <p className="text-gray-700 text-sm font-medium">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Google Map embed */}
                        <div className="rounded-xl overflow-hidden shadow-sm h-52">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.9!2d77.2090!3d28.6315!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM3JzUzLjQiTiA3N8KwMTInMzIuNCJF!5e0!3m2!1sen!2sin!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </motion.div>

                    {/* Right — contact form */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="md:col-span-2"
                    >
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white rounded-2xl p-8 shadow-sm"
                        >
                            <h2 className="text-xl font-bold text-gray-800 mb-6">
                                Send us a Message
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder="Your full name"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        placeholder="your@email.com"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone Number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91 00000 00000"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        required
                                        placeholder="How can we help?"
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Message *
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        placeholder="Write your message here..."
                                        className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <p className="mt-4 text-center text-green-600 font-medium text-sm">
                                    ✅ Message sent! We will get back to you soon.
                                </p>
                            )}

                            {status === 'error' && (
                                <p className="mt-4 text-center text-red-500 font-medium text-sm">
                                    ❌ Something went wrong. Please try again.
                                </p>
                            )}
                        </form>

                        {/* Subscribe form below contact form */}
                        <div className="mt-6 bg-white rounded-2xl p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-gray-800 mb-2">
                                Subscribe to our Newsletter
                            </h2>
                            <p className="text-gray-500 text-sm mb-6">
                                Get updates on trade exhibitions, news and our latest E-Magazine
                            </p>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200 text-sm">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    )
}