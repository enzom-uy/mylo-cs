'use client'

import NadeCard from '@/app/[locale]/components/nade/nade-card'
import NadeSkeleton from '@/app/[locale]/components/nade-skeleton'
import UserServerDataBadges from '@/app/[locale]/components/user-server-data-badges'
import { useNadesData } from '@/hooks/useReduxNadeData'
import { loadNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useTranslations } from 'next-intl'
import ServerNadesInput from './server-nades-input'

interface Props {
    nades: NadeAuthorNadeType[]
    serverId: string
    userId: string
    isAdmin?: boolean
    showNadeStatus?: boolean
}

export default function ServerNades({
    serverId,
    userId,
    nades,
    isAdmin,
    showNadeStatus
}: Props) {
    const { reduxIsLoading, reduxNades } = useNadesData({ isAdmin, nades })
    const dispatch = useAppDispatch()
    const t = useTranslations()

    const getNades = async (fetchedNades: NadeAuthorNadeType[]) => {
        dispatch(loadNades(fetchedNades))
    }

    return (
        <div className="flex w-full max-w-full flex-col gap-2 pt-4 lg:pt-0">
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2 className="m-0 w-fit text-lg font-semibold uppercase">
                    {t('Server-Profile.nades')}
                </h2>
                <UserServerDataBadges
                    nades={
                        !!reduxNades.length ? reduxNades.length : nades.length
                    }
                />
            </div>
            {nades.length !== 0 && (
                <ServerNadesInput
                    userId={userId}
                    serverId={serverId}
                    getNades={getNades}
                    isAdmin={isAdmin}
                    nades={isAdmin ? nades : undefined}
                />
            )}
            {reduxIsLoading && <NadeSkeleton />}
            {!reduxIsLoading && !!reduxNades.length && (
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                    {reduxNades?.map((nade) => (
                        <div
                            key={nade.id}
                            className="flex w-full flex-wrap justify-center gap-2 md:justify-normal"
                        >
                            <NadeCard
                                nade={nade}
                                isAdmin={isAdmin}
                                showStatus={showNadeStatus}
                                userId={userId}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
