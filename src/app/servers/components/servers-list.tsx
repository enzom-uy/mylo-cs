'use client'

import usePagination from '@/hooks/usePagination'
import { UserServers } from '../page'
import ServerCard from './server-card'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import PaginationNavigation from '@/app/components/pagination-navigation'

export default function ServersList({
    userServers
}: {
    userServers: UserServers
}) {
    const itemsPerPage = 5
    const {
        totalPages,
        currentPage,
        prevPage,
        nextPage,
        goToPage,
        currentPageItems
    } = usePagination(userServers.servers_is_member, itemsPerPage)

    return (
        <>
            <ul className="flex flex-col gap-2">
                {currentPageItems.map((server) => (
                    <ServerCard
                        key={server.name}
                        name={server.name}
                        description={server.description}
                        members={server.members.length}
                        id={server.id}
                    />
                ))}
            </ul>

            {totalPages > 0 && (
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
