"use server"

import { mongoConnection } from "@/lib/utils"
import { User } from "@/models/User"
import { hash } from "bcryptjs"

type SignupResult = {
  error?: string;
  success?: boolean;
}

export async function signup(
  username: string,
  password: string
): Promise<SignupResult> {
  try {
    if (!username || !password) {
      return { error: "Please provide both username and password" }
    }

    await mongoConnection()
    
    const existingUser = await User.findOne({ username })
    
    if (existingUser) {
      return { error: "User already exists" }
    }

    const hashedPassword = await hash(password, 10)
    
    await User.create({
      username,
      password: hashedPassword,
    })

    return { success: true }
  } catch (error) {
    console.error("Signup error:", error)
    return { error: "An error occurred during signup" }
  }
}











// "use server"

// import { mongoConnection } from "@/lib/utils"
// import { User } from "@/models/User"
// import { hash } from "bcryptjs"
// import { redirect } from "next/navigation"



// const signup = async (username:string,password:string) => {
//     "use server"

//     console.log(username, password)

//     if(!username || !password) throw new Error("Please provide both username and password")

//     await mongoConnection()
    
//     const ifUserExists = await User.findOne({username})
//     const hashedPassword = await hash(password, 10)
//     if(ifUserExists) throw new Error("User already exists")
//     else{
//         await User.create({
//             username, password:hashedPassword,
//         })
//         redirect("/")
//     }
// } 

// export default signup