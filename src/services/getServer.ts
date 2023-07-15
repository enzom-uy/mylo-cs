import { db } from '@/config/db'
import { Nade, NadeType, Server, User } from '@prisma/client'

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

    const server = await db.server.findFirst({
        where: {
            id: params.serverId
        },
        include: {
            admins: true,
            members: true,
            banned_users: true,
            nades: {
                where: whereCondition as any,
                include: {
                    author: true,
                    nade_type: true
                }
            }
        }
    })

    return server
}

export interface NadeAuthorNadeType extends Nade {
    author: User
    nade_type: NadeType
}

export interface ServerWithNadesNadeTypeAdminsMembers extends Server {
    admins: User[]
    members: User[]
    banned_users: User[]
    nades: NadeAuthorNadeType[]
}
