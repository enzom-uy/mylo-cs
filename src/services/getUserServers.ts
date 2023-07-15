import { db } from '@/config/db'
import { Session } from 'next-auth'

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
            servers_is_member: true,
            servers_is_admin: true,
            servers_is_owner: true
        }
    })
    return userServers
}
