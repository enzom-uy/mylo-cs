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
}

export default function ServerNades({ serverId, userId, nades }: Props) {
    const [foundedNades, setFoundedNades] = useState<
        NadeAuthorNadeType[] | undefined
    >()
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
                />
            </div>
            {loading && (
                <div className="flex w-full justify-center pt-4">
                    <Loader2 className="animate-spin" />
                </div>
            )}
            {!loading && (
                <div className="flex w-full flex-wrap justify-center gap-2">
                    {foundedNades?.map((nade) => (
                        <div
                            key={nade.id}
                            className="flex w-full max-w-xs justify-start"
                        >
                            <NadeCard nade={nade} key={nade.id} />
                        </div>
                    ))}
                </div>
            )}
        </section>
    )
}
