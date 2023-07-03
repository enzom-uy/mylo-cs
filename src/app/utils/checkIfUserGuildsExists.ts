import { db } from '@/config/db'
import { Guild } from './getUserGuilds'

export const checkIfUserGuildsExist = async ({
    userGuilds
}: {
    userGuilds: Guild[]
}) => {
    const guildsId = userGuilds?.map((g) => ({ id: { contains: g.id } }))
    const existingServers = await db.server.findMany({
        where: {
            OR: guildsId
        }
    })

    return existingServers
}
