'use client'

import { Badge } from '@/shad-components/badge'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import { User } from '@prisma/client'
import Image from 'next/image'
import AdminControlsBanUnban from '../server/[serverId]/admin/components/admin-controls-ban-unban'
import AdminControlsGiveRole from '../server/[serverId]/admin/components/admin-controls-give-role'
import DiscordPlaceholder from './discord-placeholder-svg'

interface Props {
    user: User
    userIsAdmin: boolean
    userSelfId: string
    serverId: string
    isBanned?: boolean
    serverAdmins?: User[]
    serverMembers?: User[]
}

export default function UserCard({
    user,
    userIsAdmin,
    userSelfId,
    serverId,
    isBanned,
    serverAdmins,
    serverMembers
}: Props) {
    const targetUserIsAdmin = serverAdmins?.filter(
        (admin) => admin.id === user.id
    )
    const isAdmin = !!targetUserIsAdmin?.length

    return (
        <div className="flex flex-wrap items-center gap-2 break-all py-2">
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
            <div className="flex flex-wrap items-center gap-2">
                {isAdmin && (
                    <Badge className="font-semibold uppercase">admin</Badge>
                )}
                {userIsAdmin && user.id !== userSelfId && (
                    <div className="flex items-center gap-2">
                        <AdminControlsBanUnban
                            bannedUserId={user.id}
                            serverId={serverId}
                            isUnban={isBanned ? true : false}
                        />
                        {!isBanned && (
                            <AdminControlsGiveRole
                                isAdmin={isAdmin}
                                serverId={serverId}
                                userId={user.id}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
