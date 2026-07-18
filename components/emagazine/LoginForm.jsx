'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HiMail, HiLockClosed } from 'react-icons/hi'

export default function LoginForm({ onLoginSuccess }) {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [status, setStatus] = useState('idle')
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setError('')

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!res.ok) {
                setError(data.message || 'Login failed')
                setStatus('idle')
                return
            }

            // Save token and user to localStorage
            localStorage.setItem('ihsn_token', data.token)
            localStorage.setItem('ihsn_user', JSON.stringify(data))

            setStatus('success')
            onLoginSuccess(data)

        } catch (err) {
            setError('Server error. Please try again.')
            setStatus('idle')
        }
    }

    return (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
            >
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <HiLockClosed className="text-blue-600" size={28} />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-1">
                        E-Magazine Login
                    </h1>
                    <p className="text-gray-500 text-sm">
                        Enter your subscriber credentials to access the magazine
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <HiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="your@email.com"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <HiLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    {/* Error message */}
                    {error && (
                        <p className="text-red-500 text-sm text-center bg-red-50 py-2 px-4 rounded-lg">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
                    >
                        {status === 'loading' ? 'Logging in...' : 'Login'}
                    </button>

                </form>

                <p className="text-center text-xs text-gray-400 mt-6">
                    Dont have credentials? Contact admin at info@ihsn.in
                </p>
            </motion.div>
        </section>
    )
}