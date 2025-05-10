import { signInCredentials } from "@/auth/actions/Auth-Actions";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";


export const authOptions: NextAuthOptions = {

    // Adaptador para prima y base de datos
    adapter: PrismaAdapter(prisma) as Adapter,

    providers: [
        Credentials({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                const user = await signInCredentials(credentials!.email, credentials!.password)

                if(user){
                    return user
                }
                return null
            },
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        Github({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
    ],

    session: {
        strategy: 'jwt'
    },

    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            return true
        },
        async jwt({ token, user, account, profile }) {

            const dbUser = await prisma.user.findFirst({
                where: {
                    email: token.email
                }
            })

            if (dbUser.isActive === false) {
                throw Error('User not active')
            }

            token.roles = dbUser?.roles
            token.id = dbUser?.id

            return token
        },
        async session({ session, token, user }) {

            if (session && session.user) {
                session.user.id = token.id
                session.user.roles = token.roles
            }
            return session
        }
    }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }