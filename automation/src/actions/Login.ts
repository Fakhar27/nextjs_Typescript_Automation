// actions/Login.ts
"use server"

import { signIn } from "@/auth"
import { mongoConnection } from "@/lib/utils"
import { AuthError } from "next-auth"

const loginHandler = async (username: string, password: string) => {
    if (!password || !username) throw new Error("Please provide both username and password")
    
    await mongoConnection()
    try {
        const result = await signIn("credentials", {
            username,
            password,
            redirect: false,
        })

        if (result?.error) {
            return "Invalid username or password."
        }

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
        throw error
    }
}

export default loginHandler