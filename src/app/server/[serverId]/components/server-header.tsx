import DiscordPlaceholder from '@/app/components/discord-placeholder-svg'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import { NadeAuthorNadeType } from '@/services/getServer'
import { User } from '@prisma/client'
import Image from 'next/image'

interface Props {
    server_icon: string | null
    members: User[]
    name: string
    description: string | null
    nades: NadeAuthorNadeType[]
}

export default function ServerHeader({
    server_icon,
    members,
    name,
    description,
    nades
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

            <div className="flex flex-col items-center gap-1 md:items-start">
                <h1 className="m-0 w-fit text-center">{name}</h1>
                <UserServerDataBadges
                    members={members.length}
                    nades={nades.length}
                />
                {description && <p>{description}</p>}
            </div>
        </div>
    )
}
