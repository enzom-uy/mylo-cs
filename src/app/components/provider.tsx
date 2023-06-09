'use client'
import { Toaster } from '@/shad-components/toaster'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return (
        <SessionProvider>
            {children} <Toaster />
        </SessionProvider>
    )
}

export default Provider
