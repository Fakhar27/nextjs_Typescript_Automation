import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { User } from "./models/User"
import {compare} from "bcryptjs"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize:async(credentials) => {
        const username = credentials?.username as string | undefined
        const password = credentials?.password as string | undefined

        if(!username || !password) throw new CredentialsSignin("PLEASE PROVIDE BOTH PASSWORD AND USERNAME")
          // CONNECTION WITH DATABSE HERE
          // CUSTOM PAGE FOR LOGIN AND SIGNUP
        const user = await User.findOne({username}).select("+password")

        if(!user) throw new CredentialsSignin("INVALID CREDENTIALS")
        if(!user.password) throw new CredentialsSignin("INVALID CREDENTIALS, YOU MIGHT HAVE SIGNED UP USING GOOGLE OR GITHUB")
        const isMatch = await compare(password, user.password)
        if(!isMatch) throw new CredentialsSignin("INVALID CREDENTIALS")
        else {
          return {
            name: user.name,
            id: user._id
          }
        }
        

        // console.log(username, password)

        // if(typeof username !== "string") throw new CredentialsSignin({
        //   cause: "invalid credentials",
        // })

        // const user = {username, id:"1"}

        // if(password !== "test") throw new CredentialsSignin({
        //   cause: "invalid credentials",
        // })
        // else {
        //   return user
        // }
      },
      // async authorize(credentials) {
      //   if (credentials?.username === "test" && credentials?.password === "test") {
      //     return { id: "1", name: "test" };
      //   }
      //   return null;
      // },
    }),
  ],
})