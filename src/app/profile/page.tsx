import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Image from 'next/image'
import Identifier from './components/identifier'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    return (
        <div className="flex w-full items-center gap-4 rounded-md bg-dark-secondary p-4">
            <div className="flex items-start gap-4">
                <div>
                    <Image
                        src={session?.user?.image as string}
                        alt="User profile picture"
                        fetchPriority="high"
                        width={100}
                        height={100}
                        className="rounded-sm"
                    />
                </div>
            </div>
            <div className="flex w-full flex-col">
                <div className="flex items-center gap-1">
                    <span className="text-sm font-bold uppercase">nombre:</span>
                    <p>{session?.user.name}</p>
                </div>
                <Identifier session={session} />
            </div>
        </div>
    )
}
