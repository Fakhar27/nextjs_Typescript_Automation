"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import React, { useState } from 'react'
import { toast } from "sonner"
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { signup } from "@/actions/Signup"
import { useRouter } from "next/navigation"

const SignupForm = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
  
    return (
      <form 
        onSubmit={async (e) => {
          e.preventDefault()
          setIsLoading(true)
          
          const formData = new FormData(e.currentTarget)
          const username = formData.get("username") as string
          const password = formData.get("password") as string
  
          if (!username || !password) {
            toast.error("Please provide both username and password")
            setIsLoading(false)
            return
          }
  
          try {
            const result = await signup(username, password)
            
            if (result.error) {
              toast.error(result.error)
            } else {
              toast.success("Signup successful!")
              router.push("/")
            }
          } catch (error) {
            toast.error("An unexpected error occurred")
          } finally {
            setIsLoading(false)
          }
        }} 
        className="flex flex-col gap-4"
      >
        <Input 
          type="text" 
          placeholder="Username" 
          name="username"
          required
          minLength={3}
        />
        <Input 
          type="password" 
          placeholder="Password" 
          name="password"
          required
          minLength={6}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    )
  }
  
  export default SignupForm





// const Signupform = () => {
//   const router = useRouter()

//   return (
//     <div>
//       <form action={async (formData: FormData) => {
//         const username = formData.get("username") as string | undefined
//         const password = formData.get("password") as string | undefined

//         if (!username || !password) {
//           toast.error("Please provide both username and password")
//           return
//         }

//         const toastId = toast.loading("Signing up...")

//         try {
//             const error = await signup(username,password)
//             if (error) {
//                 toast.error(error, { id: toastId })
//             } else {
//                 toast.success("Signup successful", { id: toastId })
//                 router.push("/")
//             }
//         } catch (error) {
//             toast.error("An unexpected error occurred", { id: toastId })
//         }
//       }} className="flex flex-col gap-4">
//         <Input type="text" placeholder="Username" name="username" />
//         <Input type="password" placeholder="Password" name="password" />
//         <Button type="submit">Sign-up</Button>
//       </form>
//     </div>
//   )
// }

// export default Signupform
