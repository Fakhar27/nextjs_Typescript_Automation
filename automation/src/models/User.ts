// models/User.ts
import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        select: false,
    },
    image: {
        type: String,
    },
    googleId: {
        type: String,
    },
    githubId: {
        type: String,
    }
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);

// import { select } from "framer-motion/client";
// import mongoose, { Schema } from "mongoose";

// const userschema = new Schema({
//     username: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         select: false,
//     },  
//     googleID: {
//         type: String,
//     },
//     githubID: {
//         type: String,
//     }
// })

// export const User = mongoose.models?.User || mongoose.model("User", userschema);