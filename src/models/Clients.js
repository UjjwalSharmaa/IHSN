import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    order: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const Client = mongoose.models.Client || mongoose.model("Client", ClientSchema);

export default Client;