import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getUserGuilds } from '@/utils/getUserGuilds'
import PrevFormSelectPath from './components/prev-form-select-path'
import { redirect } from 'next/navigation'
import { checkIfUserGuildsExist } from '@/utils/checkIfUserGuildsExists'

export default async function CreateServerPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userGuilds = await getUserGuilds({
        access_token: session.access_token
    })
    if (!userGuilds) redirect('/')
    const existingServers = await checkIfUserGuildsExist({ userGuilds })
    const serversNotCreated = userGuilds.filter(
        (g) => !existingServers.some((s) => s.id === g.id)
    )
    console.log(serversNotCreated)
    return (
        <section>
            <PrevFormSelectPath userGuilds={serversNotCreated} />
        </section>
    )
}
