import DiscordPlaceholder from '@/app/components/discord-placeholder-svg'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import Image from 'next/image'

interface Props {
    server_icon: string | null
    name: string
    description: string | null
}

export default function ServerHeader({
    server_icon,
    name,
    description
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
                {description && <p>{description}</p>}
            </div>
        </div>
    )
}
