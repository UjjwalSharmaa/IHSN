"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ManagePages() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState("");
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const pages = [
        "home", "about", "clientele", "contact",
        "social", "news", "exhibitions", "forms"
    ];

    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status]);

    const loadPage = async (pageName) => {
        setSelectedPage(pageName);
        setLoading(true);
        try {
            const res = await fetch(`/api/pages?pageName=${pageName}`);
            if (res.ok) {
                const data = await res.json();
                setSections(data.sections || []);
            } else {
                setSections([{ sectionName: "main", titleEn: "", titleHi: "", contentEn: "", contentHi: "", image: "" }]);
            }
        } catch (error) {
            setSections([{ sectionName: "main", titleEn: "", titleHi: "", contentEn: "", contentHi: "", image: "" }]);
        }
        setLoading(false);
    }

    const updateSection = (index, field, value) => {
        const updated = [...sections];
        updated[index][field] = value;
        setSections(updated);
    }

    const addSection = () => {
        setSections([...sections, { sectionName: "", titleEn: "", titleHi: "", contentEn: "", contentHi: "", image: "" }]);
    }

    const savePage = async () => {
        try {
            const res = await fetch("/api/pages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pageName: selectedPage, sections })
            });
            if (res.ok) {
                setMessage("Page saved successfully!");
            }
        } catch (error) {
            setMessage("Error saving page");
        }
    }

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Manage Pages</h1>
                <button onClick={() => router.push("/admin/dashboard")} className="bg-gray-600 px-4 py-2 rounded">
                    Back to Dashboard
                </button>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {pages.map(page => (
                        <button
                            key={page}
                            onClick={() => loadPage(page)}
                            className={`p-4 text-gray-700 rounded-lg capitalize font-semibold ${selectedPage === page ? "bg-blue-600 text-white" : "bg-white hover:bg-blue-50"}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>

                {selectedPage && !loading && (
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-bold mb-4 text-blue-400 capitalize">{selectedPage} Page</h2>
                        {sections.map((section, index) => (
                            <div key={index} className="border rounded text-gray-500 p-4 mb-4">
                                <input
                                    value={section.sectionName}
                                    onChange={(e) => updateSection(index, "sectionName", e.target.value)}
                                    placeholder="Section Name"
                                    className="w-full border rounded px-3 py-2 mb-2"
                                />
                                <input
                                    value={section.titleEn}
                                    onChange={(e) => updateSection(index, "titleEn", e.target.value)}
                                    placeholder="Title (English)"
                                    className="w-full border text-gray-500 rounded px-3 py-2 mb-2"
                                />
                                <input
                                    value={section.titleHi}
                                    onChange={(e) => updateSection(index, "titleHi", e.target.value)}
                                    placeholder="Title (Hindi)"
                                    className="w-full border text-gray-500 rounded px-3 py-2 mb-2"
                                />
                                <textarea
                                    value={section.contentEn}
                                    onChange={(e) => updateSection(index, "contentEn", e.target.value)}
                                    placeholder="Content (English)"
                                    className="w-full border text-gray-500 rounded px-3 py-2 mb-2"
                                    rows={3}
                                />
                                <textarea
                                    value={section.contentHi}
                                    onChange={(e) => updateSection(index, "contentHi", e.target.value)}
                                    placeholder="Content (Hindi)"
                                    className="w-full border text-gray-500 rounded px-3 py-2 mb-2"
                                    rows={3}
                                />
                            </div>
                        ))}
                        <button onClick={addSection} className="bg-green-500 text-white px-4 py-2 rounded mr-4 hover:bg-green-600">
                            Add Section
                        </button>
                        <button onClick={savePage} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                            Save Page
                        </button>
                        {message && <p className="text-green-600 mt-4">{message}</p>}
                    </div>
                )}
            </div>
        </div>
    )
}