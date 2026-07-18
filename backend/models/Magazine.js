const mongoose = require('mongoose')

const magazineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    edition: {
        type: String,
        required: true,
        trim: true,
    },
    publishedDate: {
        type: Date,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    thumbnailUrl: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Magazine', magazineSchema)