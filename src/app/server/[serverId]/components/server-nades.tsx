'use client'

import NadeCard from '@/app/components/nade-card'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useEffect, useState } from 'react'
import ServerNadesInput from './server-nades-input'
import { Loader2 } from 'lucide-react'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { useAppDispatch } from '@/redux/hooks'
import { loadNades, loadingNades } from '@/redux/features/nadesSlice'
import { useNadesData } from '@/hooks/useReduxNadeData'
import Loader from '@/app/components/loader'
import usePagination from '@/hooks/usePagination'
import PaginationNavigation from '@/app/components/pagination-navigation'

interface Props {
    nades: NadeAuthorNadeType[]
    serverId: string
    userId: string
    isAdmin?: boolean
}

export default function ServerNades({
    serverId,
    userId,
    nades,
    isAdmin
}: Props) {
    const [loading, setLoading] = useState<boolean>(false)
    const { reduxIsLoading, reduxNades } = useNadesData({ isAdmin, nades })
    const { currentPage, currentPageItems, prevPage, nextPage, goToPage } =
        usePagination(reduxNades, 2)
    console.log('Redux nades: ', reduxNades)
    const dispatch = useAppDispatch()

    const getNades = async (fetchedNades: NadeAuthorNadeType[]) => {
        dispatch(loadNades(fetchedNades))
    }
    console.log(nades.length)
    useEffect(() => {
        goToPage(1)
    }, [reduxNades])

    return (
        <section className="flex w-full flex-col gap-2">
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="m-0 w-fit text-lg font-semibold uppercase">
                    granadas
                </h2>
                <UserServerDataBadges
                    nades={
                        !!reduxNades.length ? reduxNades.length : nades.length
                    }
                />
            </div>
            <ServerNadesInput
                userId={userId}
                serverId={serverId}
                getNades={getNades}
                isAdmin={isAdmin}
                nades={isAdmin ? nades : undefined}
            />
            {reduxIsLoading && <Loader />}
            {!reduxIsLoading && !!reduxNades.length && (
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {currentPageItems?.map((nade) => (
                        <NadeCard nade={nade} key={nade.id} isAdmin={isAdmin} />
                    ))}
                    <PaginationNavigation
                        currentPage={currentPage}
                        goToPage={goToPage}
                        nextPage={nextPage}
                        prevPage={prevPage}
                    />
                </div>
            )}
        </section>
    )
}
