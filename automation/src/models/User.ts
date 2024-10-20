import { select } from "framer-motion/client";
import mongoose, { Schema } from "mongoose";

const userschema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        select: false,
    },  
    googleID: {
        type: String,
    },
    githubID: {
        type: String,
    }
})

export const User = mongoose.models?.User || mongoose.model("User", userschema);