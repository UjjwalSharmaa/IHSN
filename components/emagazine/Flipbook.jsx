'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { HiChevronLeft, HiChevronRight, HiDownload } from 'react-icons/hi'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

// Required for react-pdf to work
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

export default function FlipBook({ pdfUrl, title }) {
    const [numPages, setNumPages] = useState(null)
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(true)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages)
        setLoading(false)
    }

    const goToPrev = () => setPageNumber((prev) => Math.max(prev - 1, 1))
    const goToNext = () => setPageNumber((prev) => Math.min(prev + 1, numPages))

    return (
        <div className="flex flex-col items-center gap-4">

            {/* PDF Viewer */}
            <div className="bg-gray-100 rounded-xl overflow-hidden shadow-lg">
                {loading && (
                    <div className="w-64 h-80 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Loading magazine...</p>
                    </div>
                )}
                <Document
                    file={pdfUrl}
                    onLoadSuccess={onDocumentLoadSuccess}
                    loading=""
                >
                    <Page
                        pageNumber={pageNumber}
                        width={Math.min(window.innerWidth - 80, 700)}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                    />
                </Document>
            </div>

            {/* Controls */}
            {numPages && (
                <div className="flex items-center gap-4">
                    <button
                        onClick={goToPrev}
                        disabled={pageNumber <= 1}
                        className="bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40 rounded-full p-2 transition"
                    >
                        <HiChevronLeft size={20} />
                    </button>

                    <span className="text-sm text-gray-600 font-medium">
                        Page {pageNumber} of {numPages}
                    </span>

                    <button
                        onClick={goToNext}
                        disabled={pageNumber >= numPages}
                        className="bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-40 rounded-full p-2 transition"
                    >
                        <HiChevronRight size={20} />
                    </button>
                </div>
            )}

        </div>
    )
}