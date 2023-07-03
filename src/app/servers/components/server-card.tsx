'use client'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface ServerCardProps {
    name: string
    description: string | null
    members?: number
    id: string
}

const ServerCard: React.FC<ServerCardProps> = ({
    name,
    description,
    members,
    id
}) => {
    const router = useRouter()
    const serverUrl = `/server/${id}`
    return (
        <li
            className="cursor-pointer rounded-md bg-dark-secondary p-4 transition-transform duration-150 hover:translate-x-1"
            onClick={() => router.push(serverUrl)}
        >
            <Link href={serverUrl}>
                <div className="flex w-full items-center justify-between">
                    <span>{name}</span>
                    {members && (
                        <span className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4" /> {members}
                        </span>
                    )}
                </div>
                <p className="text-muted-foreground">
                    {description
                        ? description
                        : 'No hay descripción disponible.'}
                </p>
            </Link>
        </li>
    )
}

export default ServerCard
