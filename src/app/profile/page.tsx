import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Separator } from '@/shad-components/separator'
import { getUser } from '@/utils/getUser'
import ProfileHeader from './components/profile-header'
import ProfileContent from './components/profile-content'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const user = await getUser({ id: session.id })
    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-md p-4">
            <ProfileHeader user={user} />
            <Separator />
            <ProfileContent user={user} />
        </div>
    )
}
