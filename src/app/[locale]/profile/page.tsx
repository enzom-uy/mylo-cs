import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getUser } from '@/services/getUser'
import { Separator } from '@/shad-components/separator'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import ProfileContent from './components/profile-content'
import ProfileHeader from './components/profile-header'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const user = await getUser({ id: session.id })
    return (
        <>
            <section className="flex flex-col items-center gap-4 rounded-md">
                <ProfileHeader user={user} session={session} />
                <Separator />
                <ProfileContent user={user} session={session} />
            </section>
        </>
    )
}
