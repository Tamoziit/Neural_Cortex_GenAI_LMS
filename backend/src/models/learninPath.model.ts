import mongoose from "mongoose";

const LearningPathSchema = new mongoose.Schema({
    institutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution",
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    role: {
        type: String,
        required: true
    },
    moduleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Module"
    },
    approved: {
        type: Boolean,
        required: true,
        default: false
    },
    isSubscribed: {
        type: Boolean,
        required: true,
        default: false
    }
}, { timestamps: true });

const LearningPath = mongoose.model("LearningPath", LearningPathSchema);
export default LearningPath;