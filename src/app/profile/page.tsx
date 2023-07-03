import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { Separator } from '@/shad-components/separator'
import { getUserServers } from '../utils/getUserServers'

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)
    if (!session) redirect('/')
    const userServers = await getUserServers({ session })
    return (
        <div className="flex w-full flex-col items-center gap-4 rounded-md p-4">
            <div className="flex w-full gap-2">
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
                        <span className="text-sm font-bold uppercase">
                            nombre:
                        </span>
                        <p>{session?.user.name}</p>
                    </div>
                </div>
            </div>
            <Separator />
        </div>
    )
}
