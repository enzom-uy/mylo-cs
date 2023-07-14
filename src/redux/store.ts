import { configureStore } from '@reduxjs/toolkit'
import nadesReducer from './features/nadesSlice'
import membersReducer from './features/membersSlice'

export const store = configureStore({
    reducer: {
        nadesReducer,
        membersReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
