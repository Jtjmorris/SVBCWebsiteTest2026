import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "@/lib/db"

// const prisma = new PrismaClient({
//     log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
// })

export const authOptions: NextAuthOptions = {
    debug: true,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // 1. Check for Shared Member Password
                if (credentials?.password === "SVBCprivate") {
                    return {
                        id: "member-shared",
                        name: "Member",
                        email: "member@svbc.ab.ca",
                        role: "MEMBER"
                    }
                }

                // 2. Admin/Staff Credentials (Hardcoded for now, would be DB lookup)
                // Designer (Superadmin)
                if (credentials?.email === "designer@svbc.ab.ca" && credentials?.password === "SVBC-Designer-2026!") {
                    return { id: "1", name: "Designer", email: "designer@svbc.ab.ca", role: "DESIGNER" }
                }
                // Admin
                if (credentials?.email === "admin@svbc.ab.ca" && credentials?.password === "admin") {
                    return { id: "2", name: "Admin", email: "admin@svbc.ab.ca", role: "ADMIN" }
                }
                // Ministry Leader
                if (credentials?.email === "leader@svbc.ab.ca" && credentials?.password === "leader") {
                    return { id: "3", name: "Ministry Leader", email: "leader@svbc.ab.ca", role: "MINISTRY_LEADER" }
                }

                return null
            }
        })
    ],
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/auth/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = user.role
            }
            return token
        },
        async session({ session, token }) {
            if (session?.user) {
                session.user.role = token.role
            }
            return session
        }
    }
}
