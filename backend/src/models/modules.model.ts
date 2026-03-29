import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    azureCode: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    prerequisites: {
        type: Array,
        required: true,
        default: []
    },
    chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true
        }
    ]
}, { timestamps: true });

const Module = mongoose.model("Module", ModuleSchema);
export default Module;