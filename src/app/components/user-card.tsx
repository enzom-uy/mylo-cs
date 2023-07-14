'use client'

import { User } from '@prisma/client'
import Image from 'next/image'
import DiscordPlaceholder from './discord-placeholder-svg'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import { Ban } from 'lucide-react'
import AdminControlsBanUser from '../server/[serverId]/admin/components/admin-controls-ban-user'

interface Props {
    user: User
    userIsAdmin: boolean
    userSelfId: string
    serverId: string
}

export default function UserCard({
    user,
    userIsAdmin,
    userSelfId,
    serverId
}: Props) {
    return (
        <div className="flex items-center gap-2 break-all py-2 will-change-transform duration-150 hover:translate-x-2">
            {user.image ? (
                <Image
                    src={user.image}
                    alt="User profile picture"
                    width={35}
                    height={35}
                />
            ) : (
                <div
                    className="w-[35px] p-1"
                    style={{ backgroundColor: randomDiscordPlaceholderColor }}
                >
                    <DiscordPlaceholder />
                </div>
            )}
            <p>{user.name}</p>
            {userIsAdmin && user.id !== userSelfId && (
                <AdminControlsBanUser
                    bannedUserId={user.id}
                    serverId={serverId}
                />
            )}
        </div>
    )
}
