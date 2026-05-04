import mongoose from "mongoose";

const ExhibitionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    image: {
        type: String
    }
}, { timestamps: true });

const Exhibition = mongoose.models.Exhibition || mongoose.model("Exhibition", ExhibitionSchema);

export default Exhibition;