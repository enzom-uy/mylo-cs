'use client'
import { Button } from '@/shad-components/button'
import { Guild } from '../utils/getUserGuilds'
import PrevFormUserServers from './prev-form-user-servers'
import { useRouter } from 'next/navigation'

export default function PrevFormSelectPath({
    userGuilds
}: {
    userGuilds: Guild[]
}) {
    const router = useRouter()
    const handleCreateManually = () => {
        localStorage.removeItem('selectedGuild')
        router.push('/create-server/form')
    }
    return (
        <div className="flex justify-center">
            <div className="flex w-full flex-col items-center justify-center gap-4">
                <div className="flex w-full flex-col items-center gap-2">
                    Crear uno de estos servidores:
                    <PrevFormUserServers userGuilds={userGuilds} />
                </div>
                o
                <Button
                    className="p-2 text-start"
                    onClick={handleCreateManually}
                >
                    Crear un servidor manualmente
                </Button>
            </div>
        </div>
    )
}
