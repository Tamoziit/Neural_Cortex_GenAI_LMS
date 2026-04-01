import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
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
    questions: [
        {
            question: {
                type: String,
                required: true
            },
            options: {
                type: Array,
                required: true
            },
            correct: {
                type: Number,
                enum: [0, 1, 2, 3],
                required: true
            }
        }
    ]
}, { timestamps: true });

const Question = mongoose.model("Question", QuestionSchema);
export default Question;