import { db } from '@/config/db'

export const getServer = async ({
    params
}: {
    params: { serverId: string }
}) => {
    const server = await db.server.findFirst({
        where: {
            id: params.serverId
        },
        include: {
            admins: true,
            members: true,
            nades: true
        }
    })

    return server
}
