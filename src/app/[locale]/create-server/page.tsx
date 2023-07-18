import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { checkIfUserGuildsExist } from '@/services/checkIfUserGuildsExists'
import { getUserGuilds } from '@/services/getUserGuilds'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import PrevFormSelectPath from './components/prev-form-select-path'

export default async function CreateServerPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userGuilds = await getUserGuilds({
        access_token: session.access_token
    })
    const existingServers = await checkIfUserGuildsExist({ userGuilds })
    const serversNotCreated = userGuilds?.filter(
        (g) => !existingServers.some((s) => s.id === g.id)
    )
    console.log('User guilds: ', userGuilds)
    console.log('Servers not created: ', serversNotCreated)
    return (
        <section>
            <PrevFormSelectPath userGuilds={serversNotCreated} />
        </section>
    )
}
