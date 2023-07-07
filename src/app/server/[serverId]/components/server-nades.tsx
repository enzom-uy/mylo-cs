'use client'

import NadeCard from '@/app/components/nade-card'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useState } from 'react'
import ServerNadesInput from './server-nades-input'
import { Loader2 } from 'lucide-react'
import UserServerDataBadges from '@/app/components/user-server-data-badges'

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
    const [foundedNades, setFoundedNades] = useState<
        NadeAuthorNadeType[] | undefined
    >(isAdmin ? nades : undefined)
    const [loading, setLoading] = useState<boolean>(false)

    const getNades = (fetchedNades: NadeAuthorNadeType[]) => {
        return setFoundedNades(fetchedNades)
    }

    const isLoading = (loading: boolean) => {
        return setLoading(loading)
    }
    return (
        <section className="flex w-full flex-col gap-2">
            <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h2 className="m-0 w-fit text-lg font-semibold uppercase">
                        granadas
                    </h2>
                    <UserServerDataBadges nades={nades?.length} />
                </div>
                <ServerNadesInput
                    userId={userId}
                    serverId={serverId}
                    getNades={getNades}
                    isLoading={isLoading}
                    isAdmin={isAdmin}
                    nades={isAdmin ? nades : undefined}
                />
            </div>
            {loading && (
                <div className="flex w-full justify-center py-4">
                    <Loader2 className="animate-spin" />
                </div>
            )}
            {!loading && (
                <div className="flex w-fit flex-wrap justify-center gap-2 md:justify-start">
                    {foundedNades?.map((nade) => (
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
