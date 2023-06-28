import NextAuth from 'next-auth/next'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/config/db'
import { Adapter } from 'next-auth/adapters'
import { AuthOptions } from 'next-auth'
import axios from 'axios'
import { Guild } from '@/app/create-server/utils/getUserGuilds'

let userId: string
let newUser: boolean

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(db) as Adapter,
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60 // 24 hours
    },
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.id = account.providerAccountId
                token.access = account.access_token
            }
            return token
        },
        async session({ token, session }) {
            if (session) {
                session.id = token.id as string
                session.access_token = token.access as string
            }
            return session
        },
        async signIn({ account }) {
            userId = account?.providerAccountId as string
            return true
        }
    },
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
            authorization: { params: { scope: 'identify guilds email' } }
        })
    ],
    events: {
        async createUser({ user }) {
            await db.user.update({
                where: {
                    email: user.email as string
                },
                data: {
                    id: userId
                }
            })
        },
        async signIn({ isNewUser }) {
            newUser = isNewUser as boolean
            if (!isNewUser) {
                console.log('Account and user already updated.')
                return
            }
            console.log('Account is not already updated.')

            const userAccount = await db.account.findFirst({
                where: {
                    providerAccountId: userId
                }
            })
            await db.account.update({
                where: {
                    id: userAccount?.id
                },
                data: {
                    userId: userId,
                    id: userId,
                    providerAccountId: userId
                }
            })

            const userGuilds = await axios
                .get('https://discordapp.com/api/users/@me/guilds', {
                    headers: {
                        Authorization: 'Bearer ' + userAccount?.access_token
                    }
                })
                .then((res) => res.data as Guild[])

            const guildsId = userGuilds.map((g) => ({ id: { contains: g.id } }))

            const userIsInExistingServers = await db.server.findMany({
                where: {
                    OR: guildsId
                }
            })
            console.log('User is in existing servers:', userIsInExistingServers)
            if (!!userIsInExistingServers) {
                userIsInExistingServers.forEach(
                    async (g) =>
                        await db.user.update({
                            where: {
                                id: userAccount?.providerAccountId
                            },
                            data: {
                                servers_is_member: {
                                    connect: {
                                        id: g.id
                                    }
                                },
                                user_server_role: {
                                    create: {
                                        role: 'USER',
                                        server: {
                                            connect: {
                                                id: g.id
                                            }
                                        }
                                    }
                                }
                            }
                        })
                )
            }
        }
    }
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
