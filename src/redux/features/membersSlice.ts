import { User } from '@prisma/client'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const membersSlice = createSlice({
    name: 'members',
    initialState: {
        bannedMembers: [] as User[],
        members: [] as User[],
        loading: true
    },
    reducers: {
        loadingMembers: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        loadMembers: (state, action: PayloadAction<User[]>) => {
            state.members = action.payload
        },
        loadBannedMembers: (state, action: PayloadAction<User[]>) => {
            state.bannedMembers = action.payload
        },
        deleteMember: (
            state,
            action: PayloadAction<{ bannedUserId: string }>
        ) => {
            const updatedMembers = state.members.filter(
                (member) => member.id !== action.payload.bannedUserId
            )
            const bannedMember = state.members.filter(
                (m) => m.id === action.payload.bannedUserId
            )
            state.members = updatedMembers
            state.bannedMembers.push(bannedMember[0])
        },
        deleteBannedMember: (
            state,
            action: PayloadAction<{ bannedUserId: string }>
        ) => {
            const updatedBannedMembers = state.bannedMembers.filter(
                (member) => member.id !== action.payload.bannedUserId
            )
            const unbannedUser = state.bannedMembers.filter(
                (m) => m.id === action.payload.bannedUserId
            )
            state.bannedMembers = updatedBannedMembers
            state.members.push(unbannedUser[0])
        }
    }
})

export const {
    loadingMembers,
    loadMembers,
    deleteMember,
    deleteBannedMember,
    loadBannedMembers
} = membersSlice.actions

export default membersSlice.reducer
