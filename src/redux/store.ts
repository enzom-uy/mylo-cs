import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import nadesReducer from './features/nadesSlice'

export const store = configureStore({
    reducer: {
        nadesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
