import UserServerDataBadges from '@/app/[locale]/components/user-server-data-badges'
import { UserWithNadesAndServers } from '@/services/getUser'
import { Session } from 'next-auth'
import Image from 'next/image'

export default function ProfileHeader({
    user,
    session
}: {
    user: UserWithNadesAndServers | null
    session: Session
}) {
    return (
        <div className="flex w-full flex-col flex-wrap items-center gap-1 sm:flex-row sm:items-start sm:gap-4">
            <div className="flex max-w-full flex-wrap items-start justify-center sm:justify-start">
                <div>
                    <Image
                        src={user?.image as string}
                        alt="User profile picture"
                        fetchPriority="high"
                        width={100}
                        height={100}
                        className="rounded-sm"
                        priority
                    />
                </div>
            </div>
            <div className="flex flex-col items-center overflow-hidden md:items-start">
                <p className="mb-1 max-w-[25ch] truncate">{user?.name}</p>
                <UserServerDataBadges
                    nades={user?.nades.length}
                    servers={user?.servers_is_member.length}
                />
            </div>
        </div>
    )
}
