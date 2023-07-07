import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServer } from '@/services/getServer'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Separator } from '@/shad-components/separator'
import ServerNades from './components/server-nades'
import ServerHeader from './components/server-header'
import ServerMembers from './components/server-members'

export default async function ServerPage({
    params
}: {
    params: { serverId: string }
}) {
    const server = await getServer({ params })
    if (!server) redirect('/')

    const session = await getServerSession(authOptions)
    if (!session) redirect('/')

    const { name, server_icon, id, admins, members, nades, description } =
        server
    const userIsAdmin = admins.some((admin) => admin.id === session?.id)
    const userIsMember = members.some((member) => member.id === session?.id)
    return (
        <>
            <ServerHeader
                name={name}
                server_icon={server_icon}
                description={description}
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
            />
        </>
    )
}
