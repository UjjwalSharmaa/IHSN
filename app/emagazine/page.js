'use client'

import { useState, useEffect } from 'react'
import LoginForm from '@/components/emagazine/LoginForm'
import MagazineViewer from '@/components/emagazine/MagazineViewer'


export default function EMagazinePage() {
    const [user, setUser] = useState(null)
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const savedUser = localStorage.getItem('ihsn_user')
        const token = localStorage.getItem('ihsn_token')
        if (savedUser && token) {
            setUser(JSON.parse(savedUser))
        }
        setChecking(false)
    }, [])

    if (checking) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-400">Loading...</p>
            </div>
        )
    }

    return user
        ? <MagazineViewer user={user} onLogout={() => setUser(null)} />
        : <LoginForm onLoginSuccess={(data) => setUser(data)} />
}