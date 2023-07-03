import { Session } from 'next-auth'
import { db } from '@/config/db'

export const getUserServers = async ({
    session
}: {
    session: Session | null
}) => {
    const userServers = await db.user.findFirst({
        where: {
            id: session?.id
        },
        select: {
            servers_is_member: {
                select: {
                    name: true,
                    description: true,
                    UserServerRole: true,
                    members: true,
                    id: true
                }
            }
        }
    })
    return userServers
}
