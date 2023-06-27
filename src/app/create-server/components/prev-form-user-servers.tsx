'use client'
import Image from 'next/image'
import { Guild } from '../utils/getUserGuilds'
import DiscordPlaceholder from '@/app/components/discord-placeholder-svg'
import usePagination from '@/hooks/usePagination'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const COLORS = ['#5d64f4', '#ed4545', '#fca31d', '#3da45c', '#ed459c']
const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)]

export default function PrevFormUserServers({
    userGuilds
}: {
    userGuilds: Guild[]
}) {
    const itemsPerPage = 5

    const { totalPages, currentPage, prevPage, nextPage, goToPage } =
        usePagination(userGuilds, itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentPageItems = userGuilds.slice(startIndex, endIndex)
    console.log(currentPageItems)
    console.log('Total pages: ', totalPages)
    console.log('Prev page: ', prevPage)
    console.log('Next page: ', nextPage)
    console.log('goToPage goToPage: ', goToPage)

    return (
        <>
            <ul className="flex w-full flex-col items-start gap-2">
                {currentPageItems.map((g) => (
                    <li
                        key={g.id}
                        className="flex w-full cursor-pointer items-center gap-2 border-b border-b-border-dark p-2 text-sm transition-colors duration-150 hover:bg-dark-secondary"
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
                                style={{ backgroundColor: randomColor }}
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
                <div className="flex w-full justify-between">
                    <button
                        onClick={() => goToPage(prevPage as number)}
                        disabled={!prevPage && true}
                    >
                        <ArrowLeft />
                    </button>
                    <span>{currentPage}</span>
                    <button
                        onClick={() => goToPage(nextPage as number)}
                        disabled={!nextPage && true}
                    >
                        <ArrowRight />
                    </button>
                </div>
            )}
        </>
    )
}
