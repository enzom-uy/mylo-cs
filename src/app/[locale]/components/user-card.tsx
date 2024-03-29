'use client'

import { Badge } from '@/shad-components/badge'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import { User } from '@prisma/client'
import { useTranslations } from 'next-intl'
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
    ownerId?: string
}

export default function UserCard({
    user,
    userIsAdmin,
    userSelfId,
    serverId,
    isBanned,
    serverAdmins,
    ownerId
}: Props) {
    const t = useTranslations()

    const targetUserIsAdmin = serverAdmins?.filter(
        (admin) => admin.id === user.id
    )
    const isAdmin = !!targetUserIsAdmin?.length
    const isOwner = ownerId === user.id

    return (
        <div className="flex flex-wrap items-center gap-2 py-2">
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
            <p className="max-w-[12ch] overflow-hidden text-ellipsis whitespace-nowrap">
                {user.name}
            </p>
            <div className="flex flex-wrap items-center gap-2">
                {isAdmin && !isOwner ? (
                    <Badge className="font-semibold uppercase">
                        {t('User-Card.admin')}
                    </Badge>
                ) : (
                    isOwner && (
                        <Badge className="font-semibold uppercase">
                            {t('User-Card.owner')}
                        </Badge>
                    )
                )}
                {userIsAdmin &&
                    user.id !== userSelfId &&
                    user.id !== ownerId && (
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
