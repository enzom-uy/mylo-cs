import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import CreateServerForm from './components/create-server-form'

export default async function CreateServerPage() {
    const session = await getServerSession()
    if (!session) redirect('/')
    return (
        <section>
            <h1 className="mb-4">Crear un nuevo servidor</h1>
            <CreateServerForm />
        </section>
    )
}
