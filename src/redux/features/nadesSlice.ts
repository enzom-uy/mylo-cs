import { NadeAuthorNadeType } from '@/services/getServer'
import { sortNadesPendingFirst } from '@/utils/pendingNadesFirst'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface EditNade {
    nade: NadeAuthorNadeType
    updatedNade: NadeAuthorNadeType
}

export const nadesSlice = createSlice({
    name: 'nades',
    initialState: {
        nades: [] as NadeAuthorNadeType[],
        loading: false
    },
    reducers: {
        loadNades: (state, action: PayloadAction<NadeAuthorNadeType[]>) => {
            state.nades = sortNadesPendingFirst(action.payload)
        },
        editNade: (state, action: PayloadAction<EditNade>) => {
            const nadePreEdit = action.payload.nade
            const updatedNade = action.payload.updatedNade
            const nadesWithEditedRemoved = state.nades.filter(
                (n) => n.id !== nadePreEdit.id
            )
            nadesWithEditedRemoved.push(updatedNade)
            state.nades = sortNadesPendingFirst(nadesWithEditedRemoved)
        },
        deleteNade: (state, action: PayloadAction<NadeAuthorNadeType>) => {
            const updatedNades = state.nades.filter(
                (nade) => nade.id !== action.payload.id
            )
            state.nades = sortNadesPendingFirst(updatedNades)
        },
        approveNade: (state, action: PayloadAction<NadeAuthorNadeType>) => {
            const approvedNade = action.payload
            const nadesWithApprovedNadeRemoved = state.nades.filter(
                (nade) => nade.id !== approvedNade.id
            )
            nadesWithApprovedNadeRemoved.push(approvedNade)
            state.nades = sortNadesPendingFirst(nadesWithApprovedNadeRemoved)
        },
        loadingNades: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { loadNades, deleteNade, loadingNades, approveNade, editNade } =
    nadesSlice.actions
export default nadesSlice.reducer
