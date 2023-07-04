import { Guild } from '@/utils/getUserGuilds'
import PrevFormUserServers from './prev-form-user-servers'
import { AlertCircle } from 'lucide-react'

export default function PrevFormSelectPath({
    userGuilds
}: {
    userGuilds: Guild[] | undefined
}) {
    return (
        <div className="flex justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center gap-2">
                    {!!userGuilds?.length ? (
                        <>
                            Crear uno de estos servidores:
                            <PrevFormUserServers userGuilds={userGuilds} />
                        </>
                    ) : (
                        <div className="flex h-[40vh] items-center gap-2 text-lg">
                            <AlertCircle />
                            No hay ningún servidor del que seas dueño o todos ya
                            han sido creados.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
