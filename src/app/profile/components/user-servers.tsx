'use client'

import { Server } from '@prisma/client'
import { useRouter } from 'next/navigation'
import UserJoinServers from './user-join-servers'
import { Session } from 'next-auth'

export default function UserServers({
    servers,
    session
}: {
    servers: Server[] | undefined
    session: Session
}) {
    const router = useRouter()
    return (
        <div className="transparent-card max-h-full w-fit flex-grow overflow-hidden border-none">
            <div className="flex w-full items-center justify-between">
                <span className="text-sm font-bold uppercase">servidores</span>
                <UserJoinServers
                    id={session.id}
                    access_token={session.access_token}
                />
            </div>
            <ul className="no-scrollbar flex w-full flex-col gap-1 overflow-hidden overflow-x-hidden overflow-y-scroll">
                {!!servers?.length ? (
                    servers?.map((s) => (
                        <li
                            onClick={() => router.push(`/server/${s.id}`)}
                            key={s.id}
                            className="w-full cursor-pointer rounded-sm bg-dark-secondary p-2 transition-transform duration-150 hover:translate-x-1"
                        >
                            <p className="max-w-[30ch] truncate">{s.name}</p>
                        </li>
                    ))
                ) : (
                    <p className="font-semibold text-muted-foreground">
                        Todavía no estás en ningún servidor.
                    </p>
                )}
            </ul>
        </div>
    )
}
