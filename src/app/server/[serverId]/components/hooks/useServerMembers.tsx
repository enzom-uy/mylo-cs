import { loadMembers } from '@/redux/features/membersSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { User } from '@prisma/client'
import { useEffect } from 'react'

interface Props {
    members: User[]
}

export const useServerMembers = ({ members }: Props) => {
    const reduxMembers = useAppSelector((state) => state.membersReducer.members)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(loadMembers(members))
    }, [members])

    return {
        reduxMembers
    }
}
