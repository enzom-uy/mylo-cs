import { User } from '@prisma/client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const membersSlice = createSlice({
    name: 'members',
    initialState: {
        members: [] as User[],
        loading: false
    },
    reducers: {
        loadingMembers: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        loadMembers: (state, action: PayloadAction<User[]>) => {
            state.members = action.payload
        },
        deleteMember: (
            state,
            action: PayloadAction<{ bannedUserId: string }>
        ) => {
            const updatedMembers = state.members.filter(
                (member) => member.id !== action.payload.bannedUserId
            )
            state.members = updatedMembers
        }
    }
})

export const { loadingMembers, loadMembers, deleteMember } =
    membersSlice.actions

export default membersSlice.reducer
