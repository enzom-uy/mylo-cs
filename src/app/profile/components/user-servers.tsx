'use client'

import { Server } from '@prisma/client'
import { Session } from 'next-auth'
import { useRouter } from 'next/navigation'
import UserJoinServers from './user-join-servers'
import UserLeaveServer from './user-leave-server'

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
                    servers?.map((s) => {
                        const isOwner = s.owner_id === session.id
                        return (
                            <div key={s.id} className="flex items-center gap-4">
                                <li
                                    onClick={() =>
                                        router.push(`/server/${s.id}`)
                                    }
                                    className="flex w-full cursor-pointer items-center gap-2 rounded-sm bg-dark-secondary p-2 transition-transform duration-150 hover:translate-x-1"
                                >
                                    <p className="max-w-[30ch] truncate">
                                        {s.name}
                                    </p>
                                </li>
                                {!isOwner && (
                                    <UserLeaveServer
                                        server={s}
                                        userId={session.id}
                                    />
                                )}
                            </div>
                        )
                    })
                ) : (
                    <p className="font-semibold text-muted-foreground">
                        Todavía no estás en ningún servidor.
                    </p>
                )}
            </ul>
        </div>
    )
}
