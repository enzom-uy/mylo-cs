import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CreateServerForm from './components/create-server-form'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { getUserGuilds } from './utils/getUserGuilds'

export default async function CreateServerPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userGuilds = await getUserGuilds({
        access_token: session.access_token
    })
    console.log(userGuilds)
    return (
        <section>
            <h1>Crear un nuevo servidor</h1>
            <CreateServerForm session={session} userGuilds={userGuilds} />
        </section>
    )
}
