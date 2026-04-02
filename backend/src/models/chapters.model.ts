import mongoose from "mongoose";

const ChapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["MODULE", "COURSE", "LEARNING PATH"],
        required: true
    },
    description: {
        type: Array
    },
    duration: {
        type: String,
        required: true
    },
    azureCode: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Chapter = mongoose.model("Chapter", ChapterSchema);
export default Chapter;