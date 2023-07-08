import { NadeAuthorNadeType } from '@/services/getServer'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const nadesSlice = createSlice({
    name: 'nades',
    initialState: {
        nades: [] as NadeAuthorNadeType[],
        loading: false as boolean
    },
    reducers: {
        loadNades: (state, action: PayloadAction<NadeAuthorNadeType[]>) => {
            state.nades = action.payload
        },
        deleteNade: (state, action: PayloadAction<NadeAuthorNadeType>) => {
            const updatedNades = state.nades.filter(
                (nade) => nade.id !== action.payload.id
            )
            state.nades = updatedNades
        },
        loadingNades: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    }
})

export const { loadNades, deleteNade, loadingNades } = nadesSlice.actions
export default nadesSlice.reducer
