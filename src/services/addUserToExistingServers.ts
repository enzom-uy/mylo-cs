import { Guild } from '@/app/create-server/utils/getUserGuilds'
import { db } from '@/config/db'
import axios from 'axios'

interface Props {
    access_token: string
    providerAccountId: string
}

export const addUserToExistingServers = async ({
    access_token,
    providerAccountId
}: Props) => {
    try {
        console.log(access_token, providerAccountId)
        const userGuilds = await axios
            .get('https://discordapp.com/api/users/@me/guilds', {
                headers: {
                    Authorization: 'Bearer ' + access_token
                }
            })
            .then((res) => res.data as Guild[])

        const guildsId = userGuilds.map((g) => ({ id: { contains: g.id } }))
        const serverGuildsId = userGuilds.map((g) => ({
            server_id: { contains: g.id }
        }))
        await db.userServerRole.deleteMany({
            where: {
                user_id: providerAccountId,
                OR: serverGuildsId
            }
        })

        const userIsInExistingServers = await db.server.findMany({
            where: {
                OR: guildsId,
                banned_users: {
                    none: {
                        id: providerAccountId
                    }
                }
            },
            include: {
                banned_users: true
            }
        })

        console.log('User is in existing servers:', userIsInExistingServers)
        if (!!userIsInExistingServers) {
            userGuilds.forEach(async (g) => {
                await db.user.update({
                    where: {
                        id: providerAccountId
                    },
                    data: {
                        servers_is_member: {
                            connect: {
                                id: g.id
                            }
                        },
                        user_server_role: {
                            create: {
                                role: g.owner ? 'OWNER' : 'USER',
                                server: {
                                    connect: {
                                        id: g.id
                                    }
                                }
                            }
                        }
                    }
                })
            })
        }
    } catch (error) {
        console.error(error)
    }
}
