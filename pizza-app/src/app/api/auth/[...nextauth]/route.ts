// auth/[...nextauth]/route.ts
import NextAuth, { DefaultSession, AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { prisma } from "../../../../../prisma/prisma-client"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string
    } & DefaultSession["user"]
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || ""
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || ""
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null

          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) return null

          const passwordMatch = await bcrypt.compare(credentials.password, user.password)
          if (!passwordMatch) return null

          return {
            id: String(user.id),
            fullname: user.fullName,
            email: user.email
          }
        } catch {
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
    async signIn({ profile }) {
      if (!profile?.email) {
        return false
      }

      await prisma.user.upsert({
        where: { email: profile.email },
        update: {
          email: profile.email,
          name: profile.name || "Unknown"
        },
        create: {
          email: profile.email,
          name: profile.name || "Unknown",
          fullName: profile.name || "Unknown",
          password: "defaultPassword"
        }
      });

      return true
    }
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };