"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    if (status === "loading") return <div className="text-center py-10">Loading...</div>

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Admin Panel</h1>
                <button 
                    onClick={() => signOut({ callbackUrl: "/login" })}
                    className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                    Logout
                </button>
            </nav>
            <div className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-red-400">Welcome, Admin</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-black">Pages</h3>
                        <p className="text-gray-500">Manage website content</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-black">Magazines</h3>
                        <p className="text-gray-500">Upload and manage magazines</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-black">Subscribers</h3>
                        <p className="text-gray-500">Manage subscribers</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-black">Exhibitions</h3>
                        <p className="text-gray-500">Manage trade exhibitions</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-black">News</h3>
                        <p className="text-gray-500">Manage news and events</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-black">Clients</h3>
                        <p className="text-gray-500">Manage client logos</p>
                    </div>
                </div>
            </div>
        </div>
    )
}