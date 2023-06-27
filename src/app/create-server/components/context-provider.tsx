'use client'

import { CreateServerContextProvider } from '../context/create-server-context'

export default function FormContextProvider({
    children
}: {
    children: React.ReactNode
}) {
    return <CreateServerContextProvider>{children}</CreateServerContextProvider>
}
