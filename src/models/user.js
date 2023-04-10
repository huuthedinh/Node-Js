import { number } from "joi";
import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        default: "member",
    },
},
    { timestamps: true, versionKey: false })

export default mongoose.model("User", userSchema);