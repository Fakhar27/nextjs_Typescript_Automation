import React from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import Signupform from "@/components/client/signupForm";
import { Input } from "@/components/ui/input"
import { buttonVariants } from "@/components/ui/button"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { hash } from "bcryptjs";
import { User } from "@/models/User";
import { redirect } from "next/navigation";
import { mongoConnection } from "@/lib/utils";
import { signIn } from "@/auth";

const Page = () => {
//   const signup = async (formdata: FormData) => {
//     "use server"

//     const username = formdata.get("username") as string | undefined
//     const password = formdata.get("password") as string | undefined
//     console.log(username, password)

//     if(!username || !password) throw new Error("Please provide both username and password")

//     mongoConnection()
    
//     const ifUserExists = await User.findOne({username})
//     const hashedPassword = await hash(password, 10)
//     if(ifUserExists) throw new Error("User already exists")
//     else{
//         await User.create({
//             username, password:hashedPassword,
//         })
//         redirect("/login")
//     }
// } 

  return (
    <div className="flex justify-center items-center h-dvh">
        <Card>
            <CardHeader>
                <CardTitle>Sign-up</CardTitle>
            </CardHeader>
            <CardContent>
                <Signupform />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <span>OR</span>
                <form action={async () => {
                    "use server"
                    await signIn("google")
                }}>
                    <Button variant={"outline"} type="submit">Sign Up with GOOGLE</Button>
                </form>
                <form action={async () => {
                    "use server"
                    await signIn("github")
                }}>
                <   Button variant={"outline"} type="submit">Sign Up with GITHUB</Button>  
                </form>
                <Link className={buttonVariants({ variant: "outline" })} href={"/login"}>Already have an account? Click here to access</Link>
            </CardFooter>
        </Card>
    </div>
  )
}

export default Page
