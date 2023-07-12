import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServer } from '@/services/getServer'
import { Separator } from '@/shad-components/separator'
import { sortNadesPendingFirst } from '@/utils/pendingNadesFirst'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ServerHeader from '../components/server-header'
import ServerNades from '../components/server-nades'

export default async function ServerAdminPage({
    params
}: {
    params: { serverId: string }
}) {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const server = await getServer({ params, admin: true })
    const { admins, name, server_icon, description, nades, id } = server!
    const userIsAdmin = admins.some((admin) => admin.id === session?.id)
    if (!userIsAdmin) redirect(`/server/${params.serverId}`)

    const pendingNadesFirst = sortNadesPendingFirst(nades)

    console.log(pendingNadesFirst)
    return (
        <>
            <ServerHeader
                name={name}
                server_icon={server_icon}
                description={null}
            />
            <Separator className="mb-4" />
            <ServerNades
                nades={pendingNadesFirst}
                serverId={id}
                userId={session.id}
                isAdmin={true}
                showNadeStatus={true}
            />
        </>
    )
}
