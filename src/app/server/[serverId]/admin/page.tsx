import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServer } from '@/services/getServer'
import { Separator } from '@/shad-components/separator'
import { sortNadesPendingFirst } from '@/utils/pendingNadesFirst'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ServerHeader from '../components/server-header'
import ServerMembers from '../components/server-members'
import ServerNades from '../components/server-nades'
import ServerBannedMembers from './components/sections/sever-banned-members'

export default async function ServerAdminPage({
    params
}: {
    params: { serverId: string }
}) {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const server = await getServer({ params, admin: true })
    if (!server) redirect('/')
    const {
        admins,
        name,
        server_icon,
        description,
        nades,
        id,
        members,
        banned_users,
        owner_id
    } = server!
    const userIsAdmin = admins.some((admin) => admin.id === session?.id)
    if (!userIsAdmin) redirect(`/server/${params.serverId}`)
    const pendingNadesFirst = sortNadesPendingFirst(nades)
    console.log(session)

    return (
        <>
            <ServerHeader
                name={name}
                server_icon={server_icon}
                description={description}
                isAdmin={true}
                serverId={id}
                ownerId={owner_id}
                userId={session.id}
            />
            <Separator className="mb-4" />
            <ServerNades
                nades={pendingNadesFirst}
                serverId={id}
                userId={session.id}
                isAdmin={true}
                showNadeStatus={true}
            />
            <Separator className="my-4" />
            <ServerMembers
                members={members}
                userIsAdmin={userIsAdmin}
                userId={session.id}
                serverId={id}
                admins={admins}
            />
            <Separator className="my-4" />
            <ServerBannedMembers
                banned_members={banned_users}
                serverId={id}
                userIsAdmin={userIsAdmin}
                userSelfId={session.id}
            />
        </>
    )
}
