import { Button } from '@/shad-components/button'
import { Guild } from '../utils/getUserGuilds'
import PrevFormUserServers from './prev-form-user-servers'

export default function PrevFormSelectPath({
    userGuilds
}: {
    userGuilds: Guild[]
}) {
    return (
        <div className="flex justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row">
                <div className="flex w-full flex-col gap-2">
                    <PrevFormUserServers userGuilds={userGuilds} />
                </div>
                o
                <Button className="p-2 text-start">
                    Crear un servidor manualmente
                </Button>
            </div>
        </div>
    )
}
