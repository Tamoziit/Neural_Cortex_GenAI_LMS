import mongoose from "mongoose";

const ModuleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
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