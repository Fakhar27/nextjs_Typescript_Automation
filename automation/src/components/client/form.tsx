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

const LoginForm = () => {
  return (
      <form action={async (formdata:FormData) => {
                    const username = formdata.get("username") as string
                    const password = formdata.get("password") as string
                    if(!password || !username) toast.error("Please provide both username and password")

                    await loginHandler(username,password)
                }} className="flex flex-col gap-4">
                    <Input type="text" placeholder="Username" name="username"/>
                    <Input type="password" placeholder="Password" name="password" />
                    <Button type="submit">Sign-in</Button>
      </form>
  )
}

export default LoginForm
