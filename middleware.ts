import NextAuth from "next-auth"
// import {authConfig} from "@/utils/auth.config"
import {authConfig} from "@/utils/auth.config";


// export default NextAuth(authConfig).auth
// applies next auth to all the pages
export {default} from "next-auth/middleware";
// const a = authConfig as any
// export default NextAuth(a).auth


// applies next auth to matched pages
export const config = {matcher:[]}