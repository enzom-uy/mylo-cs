import { getServer } from '@/services/getServer'
import ServerHeader from './components/server-header'
import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import ServerMembers from './components/server-members'

export default async function Layout({
    children,
    params
}: {
    children: React.ReactNode
    params: { serverId: string }
}) {
    const server = await getServer({ params, admin: false })
    if (!server) redirect('/')

    const session = await getServerSession(authOptions)
    if (!session) redirect('/')

    const { name, server_icon, id, admins, members, description, owner_id } =
        server
    const userIsAdmin = admins.some((admin) => admin.id === session?.id)

    const userIsMember = members.some((member) => member.id === session?.id)
    if (!userIsMember) redirect('/')

    return (
        <div className="flex w-full flex-col lg:max-w-[83.3rem] lg:flex-row">
            <aside className="flex w-full flex-col items-center lg:max-w-xs lg:items-start">
                <ServerHeader
                    name={name}
                    server_icon={server_icon}
                    description={description}
                    serverId={id}
                    userIsAdmin={userIsAdmin}
                    userId={session?.id}
                    members={members}
                    ownerId={owner_id}
                    admins={admins}
                />

                <ServerMembers
                    members={members}
                    userIsAdmin={userIsAdmin}
                    userId={session?.id}
                    serverId={id}
                    admins={admins}
                    ownerId={owner_id}
                />
            </aside>

            {children}
        </div>
    )
}
