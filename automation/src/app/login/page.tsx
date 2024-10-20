import React from "react";
import { toast } from "sonner"
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
import { mongoConnection } from "@/lib/utils";
import { signIn } from "@/auth";
import { CredentialsSignin } from "next-auth";
import LoginForm from "@/components/client/form";
  

const Page = () => {

    // const loginHandler = async (formdata: FormData) => {

    //     const username = formdata.get("username") as string | undefined
    //     const password = formdata.get("password") as string | undefined
    //     if(!password || !username) throw new Error("Please provide both username and password")
    //     console.log(username, password)
        
    //     mongoConnection()
    //     try {
    //         await signIn("credentials",{
    //             username,
    //             password,
    //             redirect:true,
    //             redirectTo:"/",
    //         })
    //     } catch (error) {
    //         const err = error as CredentialsSignin
    //         console.error(err.message); 
    //     }
    // }

    return (
    <div className="flex justify-center items-center h-dvh">
        <Card>
            <CardHeader>
                <CardTitle>Sign-in</CardTitle>
            </CardHeader>
            <CardContent>
                <LoginForm />
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
                <span>OR</span>
                <form action="">
                    <Button variant={"outline"} type="submit">Sign in with GOOGLE</Button>
                </form>
                <Link className={buttonVariants({ variant: "outline" })} href={"/signup"}>Don't have an account? Click here to get started</Link>
            </CardFooter>
        </Card>
    </div>
    )
}

export default Page