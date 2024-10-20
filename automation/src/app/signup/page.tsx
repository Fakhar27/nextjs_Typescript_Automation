import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { hash } from "bcryptjs";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { mongoConnection } from "@/lib/utils";

const Page = () => {
  const signup = async (formdata: FormData) => {
    "use server"

    const username = formdata.get("username") as string | undefined
    const password = formdata.get("password") as string | undefined
    console.log(username, password)

    if(!username || !password) throw new Error("Please provide both username and password")

    mongoConnection()
    
    const ifUserExists = await User.findOne({username})
    const hashedPassword = await hash(password, 10)
    if(ifUserExists) throw new Error("User already exists")
    else{
        await User.create({
            username, password:hashedPassword,
        })
        redirect("/login")
    }
} 

  return (
    <div className="flex justify-center items-center h-dvh">
        <Card>
            <CardHeader>
                <CardTitle>Sign-up</CardTitle>
            </CardHeader>
            <CardContent>
                <form action={signup} className="flex flex-col gap-4">
                    <Input type="text" placeholder="Username" name="username" />
                    <Input type="password" placeholder="Password" name="password" />
                    <Button type="submit">Sign-up</Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <span>OR</span>
                <form action="">
                    <Button variant={"outline"} type="submit">Sign up with GOOGLE</Button>
                </form>
                <Link className={buttonVariants({ variant: "outline" })} href={"/login"}>Already have an account? Click here to access</Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Page
