import DiscordPlaceholder from '@/app/[locale]/components/discord-placeholder-svg'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import Image from 'next/image'
import ServerConfig from './server-config'
import { User } from '@prisma/client'
import Report from '@/app/[locale]/components/report'

interface Props {
    server_icon: string | null
    name: string
    description: string | null
    serverId: string
    isAdmin?: boolean
    ownerId: string
    userId: string
    userIsAdmin: boolean
    members: User[]
    admins: User[]
}

export default function ServerHeader({
    server_icon,
    name,
    description,
    serverId,
    ownerId,
    userId,
    userIsAdmin
}: Props) {
    return (
        <div className="mb-4 flex w-full flex-col items-center gap-4  md:items-start md:justify-start lg:w-fit lg:max-w-xs lg:flex-col">
            <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-start">
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

                <div className="flex w-full flex-col items-center gap-1  md:items-start">
                    <div className="flex w-full items-center justify-center gap-8 md:justify-between lg:gap-2">
                        <h1 className="m-0 w-fit max-w-[30ch] text-center md:text-start">
                            {name}
                        </h1>
                    </div>
                    {description && (
                        <p className=" text-start">{description}</p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-2">
                {ownerId === userId || userIsAdmin ? (
                    <ServerConfig
                        serverId={serverId}
                        ownerId={ownerId!}
                        userId={userId!}
                    />
                ) : null}
                {ownerId !== userId && (
                    <Report
                        context="SERVER"
                        reportAuthorId={userId}
                        reportedServerId={serverId}
                    />
                )}
            </div>
        </div>
    )
}
