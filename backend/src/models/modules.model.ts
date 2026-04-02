import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    phase: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    role: {
        type: String,
        enum: [
            "Azure_AI_Engineer",
            "Azure_DS",
            "Azure_Administrator",
            "Azure_Solutions_Architect",
            "Azure_DevOps_Engineer",
            "Azure_Data_Engineer",
            "Azure_Security_Engineer",
            "Azure_Developer"
        ],
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