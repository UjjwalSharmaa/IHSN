"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            console.log("Result:", result);

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/admin/dashboard/");
            }
        } catch (error) {
            setError("Something went wrong");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">IHSN Admin Login</h1>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
                    />
                    <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}