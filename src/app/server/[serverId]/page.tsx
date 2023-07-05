import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import DiscordPlaceholder from '@/app/components/discord-placeholder-svg'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'
import { getServer } from '@/utils/getServer'
import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Separator } from '@/shad-components/separator'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import ServerNades from '../components/server-nades'

export default async function ServerPage({
    params
}: {
    params: { serverId: string }
}) {
    const server = await getServer({ params })
    if (!server) redirect('/')
    const { name, server_icon, id, admins, members, nades, description } =
        server
    const session = await getServerSession(authOptions)
    const userIsAdmin = admins.some((admin) => admin.id === session?.id)
    const userIsMember = members.some((member) => member.id === session?.id)
    return (
        <>
            <div className="mb-4 flex w-full flex-col items-center gap-4 md:flex-row md:items-start md:justify-start">
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
                </div>
            </div>
            <Separator className="mb-4" />
            <ServerNades nades={nades} />
        </>
    )
}
