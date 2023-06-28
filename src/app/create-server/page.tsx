import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getUserGuilds } from './utils/getUserGuilds'
import PrevFormSelectPath from './components/prev-form-select-path'
import { redirect } from 'next/navigation'

export default async function CreateServerPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userGuilds = await getUserGuilds({
        access_token: session.access_token
    })
    if (!userGuilds) redirect('/create-server/form')
    return (
        <section>
            <PrevFormSelectPath userGuilds={userGuilds} />
        </section>
    )
}
