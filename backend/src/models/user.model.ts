import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        min: 2,
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
        max: 10
    },
    profilePic: {
        type: String
    },
    affiliation: {
        type: String,
        enum: ["student", "professional"],
        required: true
    },
    institutionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Institution"
    },
    verified: {
        type: Boolean,
        default: false
    },
    gender: {
        type: String,
        enum: ["M", "F", "O"]
    }
}, { timestamps: true });

const User = mongoose.model("User", UserSchema);
export default User;