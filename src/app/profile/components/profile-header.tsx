import Image from 'next/image'
import { DataItem } from './user-data-item'
import { UserWithNadesAndServers } from '@/utils/getUser'
import { Session } from 'next-auth'
import UserJoinServers from './user-join-servers'

export default function ProfileHeader({
    user,
    session
}: {
    user: UserWithNadesAndServers | null
    session: Session
}) {
    return (
        <div className="flex w-full flex-col flex-wrap items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex max-w-full flex-wrap items-center justify-center gap-4 sm:justify-start sm:gap-0">
                <div className="mr-3">
                    <Image
                        src={user?.image as string}
                        alt="User profile picture"
                        fetchPriority="high"
                        width={100}
                        height={100}
                        className="rounded-sm"
                    />
                </div>
                <div className="flex flex-col justify-center overflow-hidden">
                    <DataItem title="nombre:" content={user?.name as string} />
                    <DataItem
                        title="granadas subidas:"
                        content={
                            user?.nades && user.nades.length > 900
                                ? '+900'
                                : String(user?.nades?.length)
                        }
                    />
                    <DataItem
                        title="servidores:"
                        content={String(user?.servers_is_member.length)}
                    />
                </div>
            </div>
        </div>
    )
}
