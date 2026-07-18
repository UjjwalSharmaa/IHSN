'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SubscribeForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
    })
    const [status, setStatus] = useState('idle') // idle | loading | success | error

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')

        // We'll connect this to the backend later
        // For now just simulate a success
        setTimeout(() => {
            setStatus('success')
            setFormData({ name: '', email: '', phone: '', company: '' })
        }, 1500)
    }

    return (
        <section className="py-16 px-4 bg-blue-600">
            <div className="max-w-3xl mx-auto">

                {/* Heading */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-10"
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Subscribe to <span className="text-red-600"> Indian Hardware & Sanitary News </span>
                    </h2>
                    <p className="text-blue-100 text-base">
                        Stay updated with trade exhibitions, news and our latest E-Magazine
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    onSubmit={handleSubmit}
                    className="bg-white rounded-2xl p-8 shadow-xl"
                >
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
                                Company Name
                            </label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                placeholder="Your company"
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                    </div>

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                    >
                        {status === 'loading' ? 'Submitting...' : 'Subscribe Now'}
                    </button>

                    {/* Success message */}
                    {status === 'success' && (
                        <p className="mt-4 text-center text-green-600 font-medium text-sm">
                            ✅ Thank you for subscribing! We will be in touch soon.
                        </p>
                    )}

                    {/* Error message */}
                    {status === 'error' && (
                        <p className="mt-4 text-center text-red-500 font-medium text-sm">
                            ❌ Something went wrong. Please try again.
                        </p>
                    )}

                </motion.form>
            </div>
        </section>
    )
}