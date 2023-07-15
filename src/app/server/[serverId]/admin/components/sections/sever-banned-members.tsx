'use client'

import UserCard from '@/app/components/user-card'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { User } from '@prisma/client'
import MembersSkeleton from '../../../components/members-skeleton'
import { useServerBannedMembers } from './hooks/useServerBannedMembers'

interface Props {
    banned_members: User[]
    userIsAdmin: boolean
    userSelfId: string
    serverId: string
}

export default function ServerBannedMembers({
    banned_members,
    userIsAdmin,
    userSelfId,
    serverId
}: Props) {
    const { reduxBannedMembers, reduxLoadingMembers } = useServerBannedMembers({
        banned_members,
        userIsAdmin,
        userSelfId,
        serverId
    })
    return (
        <section>
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="m-0 w-fit text-lg font-semibold uppercase">
                    miembros baneados
                </h3>
                <UserServerDataBadges
                    isBannedMembers
                    members={banned_members.length}
                />
            </div>
            <div className="no-scrollbar max-h-96 overflow-x-hidden overflow-y-scroll border-t border-border-dark pt-2">
                {reduxLoadingMembers ? (
                    <MembersSkeleton />
                ) : reduxBannedMembers.length === 0 ? (
                    <p>No hay miembros baneados.</p>
                ) : (
                    reduxBannedMembers.map((m) => (
                        <UserCard
                            key={m.id}
                            user={m}
                            userIsAdmin={userIsAdmin}
                            userSelfId={userSelfId}
                            serverId={serverId}
                            isBanned={true}
                        />
                    ))
                )}
            </div>
        </section>
    )
}
