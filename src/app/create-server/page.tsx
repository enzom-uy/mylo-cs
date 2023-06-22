import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CreateServerForm from './components/create-server-form'
import { authOptions } from '../api/auth/[...nextauth]/route'

export default async function CreateServerPage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    return (
        <section>
            <h1 className="mb-4">Crear un nuevo servidor</h1>
            <CreateServerForm session={session} />
        </section>
    )
}
