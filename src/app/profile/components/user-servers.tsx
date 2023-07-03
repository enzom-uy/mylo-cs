'use client'

import { Server } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function UserServers({
    servers
}: {
    servers: Server[] | undefined
}) {
    const router = useRouter()
    return (
        <div className="transparent-card flex-grow">
            <span className="text-sm font-bold uppercase">servidores</span>
            <ul className="flex w-full flex-col gap-1 overflow-scroll">
                {servers?.map((s) => (
                    <li
                        onClick={() => router.push(`/server/${s.id}`)}
                        key={s.id}
                        className="cursor-pointer rounded-sm bg-dark-secondary p-2"
                    >
                        {s.name}
                    </li>
                ))}
            </ul>
        </div>
    )
}
