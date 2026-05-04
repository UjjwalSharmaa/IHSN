import mongoose from "mongoose";

const MagazineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        required: true
    },
    pdfUrl: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Magazine = mongoose.models.Magazine || mongoose.model("Magazine", MagazineSchema);

export default Magazine;