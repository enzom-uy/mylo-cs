import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServer } from '@/services/getServer'
import { Separator } from '@/shad-components/separator'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ServerHeader from './components/server-header'
import ServerMembers from './components/server-members'
import ServerNades from './components/server-nades'

export default async function ServerPage({
    params
}: {
    params: { serverId: string }
}) {
    const server = await getServer({ params, admin: false })
    if (!server) redirect('/')

    const session = await getServerSession(authOptions)
    if (!session) redirect('/')

    const {
        name,
        server_icon,
        id,
        admins,
        members,
        nades,
        description,
        owner_id
    } = server
    const userIsAdmin = admins.some((admin) => admin.id === session?.id)

    return (
        <>
            <ServerHeader
                name={name}
                server_icon={server_icon}
                description={description}
                serverId={id}
                userIsAdmin={userIsAdmin}
            />
            <Separator className="mb-4" />
            <ServerNades
                nades={nades}
                serverId={server.id}
                userId={session!.id}
            />
            <Separator className="my-4" />
            <ServerMembers
                members={members}
                userIsAdmin={userIsAdmin}
                userId={session?.id as string}
                serverId={id}
                admins={admins}
                ownerId={owner_id}
            />
        </>
    )
}
