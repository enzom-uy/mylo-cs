'use client'

import NadeCard from '@/app/components/nade-card'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useEffect, useState } from 'react'
import ServerNadesInput from './server-nades-input'
import { Loader2 } from 'lucide-react'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { loadNades, loadingNades } from '@/redux/features/nadesSlice'
import { useNadesData } from '@/hooks/useReduxNadeData'

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
    console.log(nades)
    const { reduxIsLoading, reduxNades } = useNadesData({ isAdmin, nades })
    const dispatch = useAppDispatch()

    const getNades = (fetchedNades: NadeAuthorNadeType[]) => {
        dispatch(loadNades(fetchedNades))
    }

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
            {reduxIsLoading && isAdmin && (
                <div className="flex w-full justify-center py-4">
                    <Loader2 className="animate-spin" />
                </div>
            )}
            {!reduxIsLoading && !!reduxNades.length && (
                <div className="flex flex-wrap justify-center gap-2 md:justify-start">
                    {reduxNades?.map((nade) => (
                        <div key={nade.id} className="flex w-full max-w-xs">
                            <NadeCard
                                nade={nade}
                                key={nade.id}
                                isAdmin={isAdmin}
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
