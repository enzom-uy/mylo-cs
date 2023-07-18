import { Guild } from '@/services/getUserGuilds'
import { AlertCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import PrevFormUserServers from './prev-form-user-servers'

export default function PrevFormSelectPath({
    userGuilds
}: {
    userGuilds: Guild[] | undefined
}) {
    const t = useTranslations()
    return (
        <div className="flex justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center gap-2">
                    {!!userGuilds?.length ? (
                        <>
                            {t('Create-Server.prev.create-one-of-these')}:
                            <PrevFormUserServers userGuilds={userGuilds} />
                        </>
                    ) : (
                        <div className="flex h-[40vh] flex-col items-center gap-2 text-center text-lg md:flex-row">
                            <AlertCircle />
                            {t('Create-Server.prev.no-owned-server')}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
