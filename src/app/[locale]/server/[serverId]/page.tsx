import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServer } from '@/services/getServer'
import { getServerSession } from 'next-auth'
import ServerNades from './components/server-nades'
import { GoAdminButton } from '../components/toggle-view-button'

export default async function ServerPage({
    params
}: {
    params: { serverId: string }
}) {
    const server = await getServer({ params, admin: false })
    const session = await getServerSession(authOptions)
    const { nades, id, admins } = server!
    const userIsAdmin = admins.some((a) => a.id === session?.id)
    return (
        <>
            <section className="flex max-w-full flex-col gap-4 border-t border-border-dark lg:ml-4 lg:flex-col lg:border-l lg:border-t-0 lg:pl-4">
                {userIsAdmin && (
                    <GoAdminButton
                        userIsAdmin={userIsAdmin}
                        id={id}
                        isAdminPage={false}
                    />
                )}
                <div>
                    <ServerNades
                        nades={nades}
                        serverId={server!.id}
                        userId={session!.id}
                    />
                </div>
            </section>
        </>
    )
}
