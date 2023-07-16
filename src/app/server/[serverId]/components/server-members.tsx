'use client'

import UserCard from '@/app/components/user-card'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { sortServerMembers } from '@/utils/sortServerMembers'
import { User } from '@prisma/client'
import { useServerMembers } from './hooks/useServerMembers'
import MembersSkeleton from './members-skeleton'

interface Props {
    members: User[]
    userIsAdmin: boolean
    userId: string
    serverId: string
    admins: User[]
    ownerId: string
}

export default function ServerMembers({
    members,
    userIsAdmin,
    userId,
    serverId,
    admins,
    ownerId
}: Props) {
    const sortedMembers = sortServerMembers({
        admins: admins,
        members: members
    })
    const { reduxMembers } = useServerMembers({
        members
    })

    return (
        <section>
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="m-0 w-fit text-lg font-semibold uppercase">
                    miembros
                </h3>
                <UserServerDataBadges members={members.length} />
            </div>
            <div className="no-scrollbar max-h-96 overflow-x-hidden overflow-y-scroll border-t border-border-dark pt-2">
                {!!!reduxMembers.length ? (
                    <MembersSkeleton />
                ) : (
                    reduxMembers.map((m) => (
                        <UserCard
                            key={m.id}
                            user={m}
                            userIsAdmin={userIsAdmin}
                            userSelfId={userId}
                            serverId={serverId}
                            serverAdmins={admins}
                            serverMembers={members}
                            ownerId={ownerId}
                        />
                    ))
                )}
            </div>
        </section>
    )
}
