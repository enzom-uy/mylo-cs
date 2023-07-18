import { Guild } from '@/app/[locale]/create-server/utils/getUserGuilds'
import { db } from '@/config/db'
import axios from 'axios'

interface Props {
    access_token: string
    providerAccountId: string
}

/**
 * Gets all discord servers the user is on, check if they exist in the database and add the user to the servers if possible.
 * @param {string} params.access_token - Access token returned by the Discord Auth Provider on login.
 * @param {string} params.providerAccountId - User provider account ID returned by the Discord Auth Provider.
 * @returns {Promise<void>}
 */
export const addUserToExistingServers = async ({
    access_token,
    providerAccountId
}: Props): Promise<void> => {
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
        console.log(userIsInExistingServers)

        if (!!userIsInExistingServers) {
            userIsInExistingServers.forEach(async (g) => {
                await db.user.update({
                    where: {
                        id: providerAccountId
                    },
                    data: {
                        servers_is_member: {
                            connect: {
                                id: g.id
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
