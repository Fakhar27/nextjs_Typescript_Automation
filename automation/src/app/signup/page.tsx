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

const Page = () => {
  return (
    <div className="flex justify-center items-center h-dvh">
        <Card>
            <CardHeader>
                <CardTitle>Sign-up</CardTitle>
            </CardHeader>
            <CardContent>
                <form action="" className="flex flex-col gap-4">
                    <Input type="text" placeholder="Username" />
                    <Input type="password" placeholder="Password" />
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
