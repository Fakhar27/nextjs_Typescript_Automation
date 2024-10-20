"use server"

import { signIn } from "@/auth"
import { mongoConnection } from "@/lib/utils"
import { CredentialsSignin } from "next-auth"

const loginHandler = async (username:string, password:string) => {

    // const username = formdata.get("username") as string | undefined
    // const password = formdata.get("password") as string | undefined
    if(!password || !username) throw new Error("Please provide both username and password")
    console.log(username, password)
    
    mongoConnection()
    try {
        await signIn("credentials",{
            username,
            password,
            redirect:true,
            redirectTo:"/",
        })
        return null
    } catch (error) {
        // Cast error to the expected type or safely handle it
        const err = error as CredentialsSignin

        console.error(err?.message || "Login failed")
        // Return error message as a string
        return err?.message || "Login failed"
    }
}
export default loginHandler