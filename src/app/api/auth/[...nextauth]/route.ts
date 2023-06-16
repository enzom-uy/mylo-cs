import NextAuth from 'next-auth/next'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/config/db'
import { Adapter } from 'next-auth/adapters'
import { PrismaClient } from '.prisma/client'
import { NextAuthOptions, Session } from 'next-auth'

const prisma = new PrismaClient()

export interface UserSession extends Session {
    userId?: string
}

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    callbacks: {
        async session({ session, user, token }) {
            session.user.id = user.id
            return session
        }
    },
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string
        })
    ]
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
