"use server"

import { signIn } from "@/auth"
import { mongoConnection } from "@/lib/utils"
import { AuthError } from "next-auth"

const loginHandler = async (username: string, password: string) => {
    if (!password || !username) throw new Error("Please provide both username and password")
    console.log(username, password)
    
    mongoConnection()
    try {
        await signIn("credentials", {
            username,
            password,
            redirect: false, // Change this to false
        })
        return null
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return "Invalid username or password."
                default:
                    return "An error occurred during sign in."
            }
        }
        return "An unexpected error occurred."
    }
}

export default loginHandler