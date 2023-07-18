'use client'
import { store } from '@/redux/store'
import { Toaster } from '@/shad-components/toaster'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'

interface Props {
    children: ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
            <SessionProvider>
                {children} <Toaster />
            </SessionProvider>
        </ReduxProvider>
    )
}

export default Provider
