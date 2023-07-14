import { Guild } from '@/app/create-server/utils/getUserGuilds'
import { db } from '@/config/db'
import axios from 'axios'

// Use discord API to get user's guilds.
// Checks if any of the guilds already exists in the database
// Add the user to the guilds that exists.

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
            userIsInExistingServers.forEach(
                async (g) =>
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
    } catch (error) {
        console.error(error)
    }
}
