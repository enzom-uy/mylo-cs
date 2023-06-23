import NextAuth from 'next-auth/next'
import DiscordProvider from 'next-auth/providers/discord'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from '@/config/db'
import { Adapter } from 'next-auth/adapters'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'

type Guild = {
    id: string
    name: string
    icon: string
    owner: boolean
    permissions: number
    permissions_new: string
    features: string[]
}

let userId: string
let userGuilds: Guild[]

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    return await NextAuth(req, res, {
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
                }
                return session
            },
            async signIn({ account }) {
                userId = account?.providerAccountId as string
                await axios
                    .get('https://discordapp.com/api/users/@me/guilds', {
                        headers: {
                            Authorization: 'Bearer ' + account?.access_token
                        }
                    })
                    .then((res) => {
                        const guilds = res.data as Guild[]
                        userGuilds = guilds.filter(
                            (guild) => guild.owner === true
                        )
                    })
                    .catch((e) => console.log(e))

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

                try {
                    for (const guild of userGuilds) {
                        const serverName = guild.name
                        const serverId = guild.id
                        const ownerId = userId
                        await db.server.create({
                            data: {
                                id: serverId,
                                name: serverName,
                                admins: {
                                    connect: {
                                        id: ownerId
                                    }
                                },
                                members: {
                                    connect: {
                                        id: ownerId
                                    }
                                },
                                UserServerRole: {
                                    create: {
                                        user: {
                                            connect: {
                                                id: ownerId
                                            }
                                        },
                                        role: 'OWNER'
                                    }
                                }
                            }
                        })
                    }
                } catch (e) {
                    throw new Error('No pudimos crear los servidores.')
                }
            },
            async signIn({ isNewUser }) {
                if (!isNewUser) {
                    console.log('Account and user already updated.')
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
            }
        }
    })
}

export { handler as GET, handler as POST }
