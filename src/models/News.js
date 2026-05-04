import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    titleEn: {
        type: String,
        required: true
    },
    titleHi: {
        type: String,
    },
    contentEn: {
        type: String,
        required: true
    },
    contentHi: {
        type: String,
    },
    image: {
        type: String
    },
    publishedDate: {
        type: Date,
        default: Date.now
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const News = mongoose.models.News || mongoose.model("News", NewsSchema);

export default News;