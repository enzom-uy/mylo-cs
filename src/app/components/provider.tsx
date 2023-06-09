'use client'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

const Provider: React.FC<Props> = ({ children }) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default Provider
