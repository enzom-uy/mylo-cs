import { db } from '@/config/db'
import { Nade, Server, User } from '@prisma/client'

export interface UserWithNadesAndServers extends User {
    nades: Nade[]
    servers_is_member: Server[]
    servers_is_admin: Server[]
    servers_is_owner: Server[]
}

export const getUser = async ({ id }: { id: string }) => {
    const user = await db.user.findFirst({
        where: {
            id
        },
        include: {
            nades: true,
            servers_is_member: true,
            servers_is_admin: true,
            servers_is_owner: true
        }
    })
    return user
}
