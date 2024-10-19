import NextAuth, { CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
 
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
      authorize:async({username, password}) => {
        console.log(username, password)

        if(typeof username !== "string") throw new CredentialsSignin({
          cause: "invalid credentials",
        })

        const user = {username, id:"1"}

        if(password !== "test") throw new CredentialsSignin({
          cause: "invalid credentials",
        })
        else {
          return user
        }
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