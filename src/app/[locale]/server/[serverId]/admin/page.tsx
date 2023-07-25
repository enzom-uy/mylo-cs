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
import { GoAdminButton } from '../../components/toggle-view-button'

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
    const userIsMember = members.some((member) => member.id === session?.id)
    if (!userIsMember) redirect('/')
    const pendingNadesFirst = sortNadesPendingFirst(nades)

    return (
        <section className="flex w-full max-w-full flex-col gap-4 border-t border-border-dark lg:ml-4 lg:border-l lg:border-t-0 lg:pl-4">
            <GoAdminButton
                userIsAdmin={userIsAdmin}
                id={id}
                isAdminPage={true}
            />
            <div className="flex w-full flex-col lg:flex-row lg:justify-between">
                <ServerNades
                    nades={pendingNadesFirst}
                    serverId={id}
                    userId={session.id}
                    isAdmin={true}
                    showNadeStatus={true}
                />
            </div>
            <ServerBannedMembers
                banned_members={banned_users}
                serverId={id}
                userIsAdmin={userIsAdmin}
                userSelfId={session.id}
            />
        </section>
    )
}
