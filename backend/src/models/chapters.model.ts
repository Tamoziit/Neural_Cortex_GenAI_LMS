import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: Array,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    azureCode: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module",
        required: true
    }
}, { timestamps: true });

const Chapter = mongoose.model("Chapter", ChapterSchema);
export default Chapter;