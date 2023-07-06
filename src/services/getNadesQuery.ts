import { db } from '@/config/db'

export const getNadesQuery = async ({
    query,
    userId,
    serverId
}: {
    query?: string
    userId: string
    serverId?: string
}) => {
    const queryWithSpaces = query && `%${query.replaceAll('-', ' ')}%`
    const nades = await db.nade.findMany({
        where: {
            Server: {
                members: {
                    some: {
                        // I don't want users to see nades of other servers if they're searching for nades in a specific server page
                        id: serverId ? undefined : userId
                    }
                },
                id: serverId ? serverId : undefined
            },
            OR: [
                {
                    title: {
                        contains: queryWithSpaces
                    }
                },
                {
                    nade_type_name: {
                        contains: queryWithSpaces
                    }
                },
                {
                    author: {
                        name: {
                            contains: queryWithSpaces
                        }
                    }
                },
                {
                    map_name: {
                        contains: queryWithSpaces
                    }
                }
            ]
        },
        include: {
            author: {
                select: {
                    name: true
                }
            },
            map: {
                select: {
                    name: true
                }
            }
        }
    })
    return nades
}
