'use client'

import NadeCard from '@/app/components/nade-card'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useState } from 'react'
import ServerNadesInput from './server-nades-input'

interface Props {
    nades: NadeAuthorNadeType[]
    serverId: string
    userId: string
}

export default function ServerNades({ serverId, userId }: Props) {
    const [nades, setNades] = useState<NadeAuthorNadeType[] | undefined>()
    const getNades = (fetchedNades: NadeAuthorNadeType[]) => {
        return setNades(fetchedNades)
    }
    return (
        <div className="flex w-full flex-col gap-2">
            <div>
                <h2 className="text-lg font-semibold uppercase">granadas</h2>
                <ServerNadesInput
                    userId={userId}
                    serverId={serverId}
                    getNades={getNades}
                />
            </div>
            <div className="flex w-full flex-wrap justify-center gap-2">
                {nades?.map((nade) => (
                    <div
                        key={nade.id}
                        className="flex w-full max-w-xs justify-start"
                    >
                        <NadeCard nade={nade} key={nade.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
