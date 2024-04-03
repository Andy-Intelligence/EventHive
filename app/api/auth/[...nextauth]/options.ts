import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/(backend)/models/user";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import connectMongoDb from "@/(backend)/connectionToDatabase/mongoDbConnect";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username",
        },
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },

      async authorize(credentials, req: any) {
        const res = await fetch(
          `https://event-hive-liart.vercel.app/api/login-user`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
          }
        );

        const user = await res.json();
        console.log('hello',user)
        // const isOnAdminPanel = req.nextUrl?.startsWith("/admin");
        // const isOnLoginPage = req.nextUrl?.startsWith("/login");

        
        // if (isOnLoginPage && user) {
        //   console.log("i am on login")
        //   return Response.redirect(new URL("/find-event",req.nextUrl));
        // }

        const credentialPassword = credentials?.password ?? "";
        console.log("this is passsword ", credentialPassword);

        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentialPassword,
            user?.password
          );

          if (isPasswordCorrect) {
            return user;
          }
        }

        // if(res.ok && credentials?.email === user?.email && credentials?.password === user?.password ){
        //     return user
        // }else{
        //     return null
        // }

        
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: "/auth/signout",
    // error: "/auth/error", // Error code passed in query string as ?error=
    // verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   // Allows relative callback URLs
    //   // console.log(url, baseUrl);
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },

    async signIn({ user, account, profile, email, credentials }) {
      if (account?.provider === "google") {
        connectMongoDb();
        try {
          const existingUser = await User.findOne({ email: profile?.email });

          if (!existingUser) {
            await User.updateOne(
              { email: profile?.email },
              {
                $setOnInsert: {
                  username: profile?.name,
                  email: profile?.email,
                  image: profile?.image,
                  role: "user",
                },
              },
              { upsert: true }
            );
          }
          console.log("user, user",user,account,profile)

          // user.userMongoDbData = existingUser
          
        } catch (error) {
          console.error(error);
        }

        return Promise.resolve(true);
      }

      
      return Promise.resolve(false);
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.accessToken = account?.access_token

        // token.role = user.role;
      }
      return token;
    },

    async session({ session, token, user }) {
      if (session.user) {
        // session.user.eventHost = token.eventHost;
        // session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        // session.user.accessToken = token.access_token
        // session.user.image = token.image
      }
      return session;
    },
  },
};
