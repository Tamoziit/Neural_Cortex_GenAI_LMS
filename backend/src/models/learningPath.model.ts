import mongoose from "mongoose";

const LearningPathSchema = new mongoose.Schema({
    institutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
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
    type: {
        type: String,
        enum: ["learning-path", "recommended-course"],
        required: true
    },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        required: true
    },
    moduleIds: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Module"
        }
    ],
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