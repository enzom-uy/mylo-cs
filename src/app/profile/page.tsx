import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Separator } from '@/shad-components/separator'
import { getUser } from '@/services/getUser'
import ProfileHeader from './components/profile-header'
import ProfileContent from './components/profile-content'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const user = await getUser({ id: session.id })
    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-md border border-border-dark p-4">
            <ProfileHeader user={user} session={session} />
            <Separator />
            <ProfileContent user={user} session={session} />
        </div>
    )
}
