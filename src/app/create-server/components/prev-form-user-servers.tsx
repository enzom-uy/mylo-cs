'use client'

import Image from 'next/image'
import { Guild } from '@/services/getUserGuilds'
import DiscordPlaceholder from '@/app/components/discord-placeholder-svg'
import usePagination from '@/hooks/usePagination'
import { useRouter } from 'next/navigation'
import PaginationNavigation from '@/app/components/pagination-navigation'
import { randomDiscordPlaceholderColor } from '@/utils/getRandomColorForPlaceholder'

export default function PrevFormUserServers({
    userGuilds
}: {
    userGuilds: Guild[]
}) {
    const router = useRouter()
    const itemsPerPage = 5
    const {
        totalPages,
        currentPage,
        prevPage,
        nextPage,
        goToPage,
        currentPageItems
    } = usePagination(userGuilds, itemsPerPage)

    const handleSelectServer = (g: Guild) => {
        localStorage.setItem('selectedGuild', JSON.stringify(g))
        router.push('/create-server/form')
    }

    return (
        <>
            <ul className="flex w-full flex-col items-start gap-2">
                {currentPageItems.map((g) => (
                    <li
                        key={g.id}
                        className="flex w-full cursor-pointer items-center gap-2 border-b border-b-border-dark p-2 text-sm transition-colors duration-150 hover:bg-dark-secondary"
                        onClick={() => handleSelectServer(g)}
                    >
                        {g.icon ? (
                            <Image
                                alt="Server icon"
                                src={`https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png`}
                                width={34}
                                height={34}
                                className="rounded-sm"
                            />
                        ) : (
                            <div
                                className={`h-full max-h-[34px] w-full max-w-[34px] rounded-sm p-[2px]`}
                                style={{
                                    backgroundColor:
                                        randomDiscordPlaceholderColor
                                }}
                            >
                                <DiscordPlaceholder />
                            </div>
                        )}
                        <p className="w-[22ch] overflow-hidden text-ellipsis whitespace-nowrap md:w-full">
                            {g.name}
                        </p>
                    </li>
                ))}
            </ul>
            {totalPages > 1 && (
                <PaginationNavigation
                    goToPage={goToPage}
                    nextPage={nextPage}
                    prevPage={prevPage}
                    currentPage={currentPage}
                />
            )}
        </>
    )
}
