"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import React from 'react'
import { toast } from "sonner"
import loginHandler from "@/actions/Login"
import { useRouter } from "next/navigation"

const LoginForm = () => {
    const router = useRouter()
  
    return (
      <form action={async (formData: FormData) => {
        const username = formData.get("username") as string
        const password = formData.get("password") as string
        if (!password || !username) {
          toast.error("Please provide both username and password")
          return
        }
  
        const toastId = toast.loading("Logging in...")
  
        try {
          const error = await loginHandler(username, password)
          if (error) {
            toast.error(error, { id: toastId })
          } else {
            toast.success("Login successful", { id: toastId })
            router.refresh() // Redirect to home page on successful login
          }
        } catch (error) {
          toast.error("An unexpected error occurred", { id: toastId })
        }
      }} className="flex flex-col gap-4">
        <Input type="text" placeholder="Username" name="username"/>
        <Input type="password" placeholder="Password" name="password" />
        <Button type="submit">Sign-in</Button>
      </form>
    )
  }
  
export default LoginForm
