import { NadeWithAuthorAndMap } from '@/app/components/sections/nades-section'
import { db } from '@/config/db'
import { Nade, Server, User } from '@prisma/client'

export const getServer = async ({
    params,
    admin
}: {
    params: { serverId: string }
    admin: boolean
}) => {
    let whereCondition: { status: string } | undefined = { status: 'APPROVED' } // Filtro por defecto

    if (admin) {
        whereCondition = undefined // Eliminar el filtro si admin es true
    }

    const serverQuery = {
        where: {
            id: params.serverId
        },
        include: {
            admins: true,
            members: true,
            nades: {
                where: whereCondition,
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    },
                    nade_type: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    }

    const server = await db.server.findFirst({
        where: {
            id: params.serverId
        },
        include: {
            admins: true,
            members: true,
            nades: {
                where: whereCondition as any,
                include: {
                    author: {
                        select: {
                            name: true
                        }
                    },
                    nade_type: {
                        select: {
                            name: true
                        }
                    }
                }
            }
        }
    })

    return server
}

export interface NadeAuthorNadeType extends Nade {
    author: {
        name: string
    }
    nade_type: {
        name: string
    }
}

export interface ServerWithNadesNadeTypeAdminsMembers extends Server {
    admins: User[]
    members: User[]
    nades: NadeWithAuthorAndMap[]
}
