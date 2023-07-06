import { db } from '@/config/db'

export const getNadesQuery = async ({
    query,
    userId
}: {
    query?: string
    userId: string
}) => {
    const queryWithSpaces = query && `%${query.replaceAll('-', ' ')}%`
    const nades = await db.nade.findMany({
        where: {
            Server: {
                members: {
                    some: {
                        id: userId
                    }
                }
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
