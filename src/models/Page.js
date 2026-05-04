import mongoose from "mongoose";

const PageSchema = new mongoose.Schema({
    pageName: {
        type: String,
        required: true,
        unique: true
    },
    sections: [
        {
            sectionName: String,
            titleEn: String,
            titleHi: String,
            contentEn: String,
            contentHi: String,
            image: String,
        }
    ]
}, { timestamps: true });

const Page = mongoose.models.Page || mongoose.model("Page", PageSchema);

export default Page;