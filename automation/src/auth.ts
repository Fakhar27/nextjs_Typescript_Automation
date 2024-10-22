// auth.ts
import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import { User } from "./models/User"
import { compare } from "bcryptjs"
import { mongoConnection } from "./lib/utils"

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
      async authorize(credentials) {
        try {
          await mongoConnection();
          
          const username = credentials?.username;
          const password = credentials?.password;

          if (!username || !password) {
            throw new CredentialsSignin({
              cause: "PLEASE PROVIDE BOTH PASSWORD AND USERNAME"
            });
          }

          const user = await User.findOne({ username }).select("+password");

          if (!user) {
            throw new CredentialsSignin({
              cause: "INVALID CREDENTIALS"
            });
          }

          if (!user.password) {
            throw new CredentialsSignin({
              cause: "INVALID CREDENTIALS, YOU MIGHT HAVE SIGNED UP USING GOOGLE OR GITHUB"
            });
          }

          const isMatch = await compare(password as string, user.password as string);
          
          if (!isMatch) {
            throw new CredentialsSignin({
              cause: "INVALID CREDENTIALS"
            });
          }

          return {
            id: user._id.toString(),
            name: user.username,
            email: user.email
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      try {
        await mongoConnection();

        if (account?.provider === "google") {
          const { email, name, image } = user;
          
          let existingUser = await User.findOne({ email });
          
          if (!existingUser) {
            existingUser = await User.create({
              email,
              username: name,
              image,
              googleId: user.id
            });
          }
          
          return true;
        }

        if (account?.provider === "github") {
          const { email, name, image } = user;
          
          let existingUser = await User.findOne({ email });
          
          if (!existingUser) {
            existingUser = await User.create({
              email,
              username: name,
              image,
              githubId: user.id
            });
          }
          
          return true;
        }

        return true;
      } catch (error) {
        console.error("SignIn callback error:", error);
        return false;
      }
    }
  },
  session: {
    strategy: "jwt"
  }
});


// import NextAuth, { AuthError, CredentialsSignin } from "next-auth"
// import Google from "next-auth/providers/google"
// import GitHub from "next-auth/providers/github"
// import Credentials from "next-auth/providers/credentials"
// import { User } from "./models/User"
// import {compare} from "bcryptjs"
// import { mongoConnection } from "./lib/utils"
 
// export const { handlers, signIn, signOut, auth } = NextAuth({
//   providers: [
//     Google({
//       clientId: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//     }),
//     GitHub({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     Credentials({
//       name: "Credentials",
//       credentials: {
//         username: {
//           label: "Username",
//           type: "text",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },
//       authorize:async(credentials) => {
//         const username = credentials?.username as string | undefined
//         const password = credentials?.password as string | undefined

//         if(!username || !password) throw new CredentialsSignin({
//           cause:"PLEASE PROVIDE BOTH PASSWORD AND USERNAME"})
//           // CONNECTION WITH DATABSE HERE
//           // CUSTOM PAGE FOR LOGIN AND SIGNUP
//         const user = await User.findOne({username}).select("+password")

//         if(!user) throw new CredentialsSignin({
//           cause:"INVALID CREDENTIALS"})
//         if(!user.password) throw new CredentialsSignin({
//           cause:"INVALID CREDENTIALS, YOU MIGHT HAVE SIGNED UP USING GOOGLE OR GITHUB"})
//         const isMatch = await compare(password, user.password)
//         if(!isMatch) throw new CredentialsSignin({
//           cause:"INVALID CREDENTIALS"})
//         else {
//           return {
//             name: user.name,
//             id: user._id
//           }
//         }
        

//         // console.log(username, password)

//         // if(typeof username !== "string") throw new CredentialsSignin({
//         //   cause: {
//         // cause:"invalid credentials"},
//         // })

//         // const user = {username, id:"1"}

//         // if(password !== "test") throw new CredentialsSignin({
//         //   cause: {
//         // cause:"invalid credentials"},
//         // })
//         // else {
//         //   return user
//         // }
//       },
//       // async authorize(credentials) {
//       //   if (credentials?.username === "test" && credentials?.password === "test") {
//       //     return { id: "1", name: "test" };
//       //   }
//       //   return null;
//       // },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks:{
//     signIn: async ({user,account} => {
//       if(account?.provider === "google"){
//         try {
//           const {email,name,image,id} = user
//           await mongoConnection()
//           const alreadyUser = await User.findOne({email})
//           if(!alreadyUser){
//             await User.create({email,name,image,googleId:id})
//           }
//           return true
//         } catch (error) {
//           throw new AuthError("An error occurred during sign in.")
//         }
//       }
//       return false
//     })
//   },
// })