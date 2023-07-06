import { NadeWithAuthorAndMap } from '@/app/components/sections/nades-section'
import { db } from '@/config/db'
import { Nade, Server, User } from '@prisma/client'

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
            nades: {
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
