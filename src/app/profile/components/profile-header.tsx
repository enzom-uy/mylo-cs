import Image from 'next/image'
import { DataItem } from './user-data-item'
import { UserWithNadesAndServers } from '@/utils/getUser'

export default function ProfileHeader({
    user
}: {
    user: UserWithNadesAndServers | null
}) {
    return (
        <div className="flex w-full">
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
            <div className="flex w-full flex-col justify-center">
                <DataItem title="nombre:" content={user?.name as string} />
                <DataItem
                    title="granadas subidas:"
                    content={String(user?.nades.length)}
                />
                <DataItem
                    title="servidores:"
                    content={String(user?.servers_is_member.length)}
                />
            </div>
        </div>
    )
}
