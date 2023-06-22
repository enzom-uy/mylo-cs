import NextAuth from 'next-auth/next'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/config/db'
import { Adapter } from 'next-auth/adapters'
import { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    callbacks: {
        async session({ token, session, user }) {
            if (session) {
                session.id = token.id as string
                await db.user.update({
                    where: {
                        email: session.user.email as string
                    },
                    data: {
                        id: session.id
                    }
                })
            }

            return session
        },
        async signIn({ user, account }) {
            return true
        },
        async jwt({ token, account }) {
            if (account) {
                token.id = account.providerAccountId
            }
            return token
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
