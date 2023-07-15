'use client'

import UserCard from '@/app/components/user-card'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import {
    loadBannedMembers,
    loadingMembers
} from '@/redux/features/membersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { User } from '@prisma/client'
import { useEffect } from 'react'
import MembersSkeleton from '../../../components/members-skeleton'

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
    const reduxBannedMembers = useAppSelector(
        (state) => state.membersReducer.bannedMembers
    )
    const reduxLoadingMembers = useAppSelector(
        (state) => state.membersReducer.loading
    )
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadBannedMembers(banned_members))
        dispatch(loadingMembers(false))
    }, [banned_members])
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
