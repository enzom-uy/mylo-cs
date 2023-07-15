import { db } from '@/config/db'
import { Nade, Server, User, UserServerRole } from '@prisma/client'

export interface ServerWithUserRole extends Server {
    UserServerRole: UserServerRole[]
}

export interface UserWithNadesAndServers extends User {
    nades: Nade[]
    servers_is_member: ServerWithUserRole[]
}

export const getUser = async ({ id }: { id: string }) => {
    const user = await db.user.findFirst({
        where: {
            id
        },
        include: {
            nades: true,
            servers_is_member: {
                include: {
                    UserServerRole: {
                        where: {
                            user_id: id
                        }
                    }
                }
            }
        }
    })
    console.log(user)
    return user
}
