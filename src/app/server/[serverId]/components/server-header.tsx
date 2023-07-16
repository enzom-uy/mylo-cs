import DiscordPlaceholder from '@/app/components/discord-placeholder-svg'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import Image from 'next/image'
import ServerConfig from './server-config'

interface Props {
    server_icon: string | null
    name: string
    description: string | null
    serverId: string
    isAdmin?: boolean
    ownerId?: string
    userId?: string
}

export default function ServerHeader({
    server_icon,
    name,
    description,
    isAdmin,
    serverId,
    ownerId,
    userId
}: Props) {
    return (
        <div className="mb-4 flex w-full flex-col items-center gap-4 break-all md:flex-row md:items-start md:justify-start">
            {server_icon ? (
                <Image
                    className="rounded-md"
                    src={server_icon}
                    alt="Server icon"
                    width={100}
                    height={100}
                    priority
                />
            ) : (
                <div
                    className="h-fit w-[100px] rounded-md p-2"
                    style={{
                        backgroundColor: randomDiscordPlaceholderColor
                    }}
                >
                    <DiscordPlaceholder />
                </div>
            )}

            <div className="flex w-full flex-col items-center gap-1 md:items-start">
                <div className="flex w-full items-start justify-between gap-8">
                    <h1 className="m-0 w-fit text-center md:text-start">
                        {name}
                    </h1>
                    {isAdmin && ownerId === userId && (
                        <ServerConfig
                            serverId={serverId}
                            ownerId={ownerId!}
                            userId={userId!}
                        />
                    )}
                </div>
                {description && <p>{description}</p>}
            </div>
        </div>
    )
}
