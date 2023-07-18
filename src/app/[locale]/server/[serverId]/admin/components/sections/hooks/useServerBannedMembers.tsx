import {
    loadBannedMembers,
    loadingMembers
} from '@/redux/features/membersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { User } from '@prisma/client'
import { useEffect } from 'react'

interface Props {
    banned_members: User[]
    userIsAdmin: boolean
    userSelfId: string
    serverId: string
}

export const useServerBannedMembers = ({
    banned_members,
    userIsAdmin,
    userSelfId,
    serverId
}: Props) => {
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

    return {
        reduxBannedMembers,
        reduxLoadingMembers
    }
}
