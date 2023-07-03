import { Guild } from '@/utils/getUserGuilds'
import PrevFormUserServers from './prev-form-user-servers'

export default function PrevFormSelectPath({
    userGuilds
}: {
    userGuilds: Guild[]
}) {
    return (
        <div className="flex justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center gap-2">
                    Crear uno de estos servidores:
                    <PrevFormUserServers userGuilds={userGuilds} />
                </div>
            </div>
        </div>
    )
}
