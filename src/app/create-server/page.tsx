import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CreateServerForm from './components/create-server-form'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getUserGuilds } from './utils/getUserGuilds'
import PrevFormUserServers from './components/prev-form-user-servers'
import PrevFormSelectPath from './components/prev-form-select-path'

export default async function CreateServerPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userGuilds = await getUserGuilds({
        access_token: session.access_token
    })
    console.log(userGuilds)
    return (
        <section>
            {userGuilds ? (
                <PrevFormSelectPath userGuilds={userGuilds} />
            ) : (
                <CreateServerForm session={session} />
            )}
            {/* <PrevFormUserServers /> */}
            {/* <CreateServerForm session={session} userGuilds={userGuilds} /> */}
        </section>
    )
}
