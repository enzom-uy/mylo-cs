import { getServerSession } from 'next-auth'
import CreateServerForm from './components/create-server-form'
import { redirect } from 'next/navigation'

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
