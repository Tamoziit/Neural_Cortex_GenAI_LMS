import mongoose from "mongoose";

const InstitutionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2
    },
    type: {
        type: String,
        enum: ["institute", "corporate"],
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 6,
        required: true
    },
    mobileNo: {
        type: String,
        min: 10,
        max: 10,
    },
    profilePic: {
        type: String
    },
    domain: {
        type: String,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    studyGroups: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }
    ],
    requests: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });

const Institution = mongoose.model("Institution", InstitutionSchema);
export default Institution;