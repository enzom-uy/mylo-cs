import { UserWithNadesAndServers } from '@/services/getUser'
import { Session } from 'next-auth'
import UserLastNade from './user-last-nade'
import UserServers from './user-servers'

export default function ProfileContent({
    user,
    session
}: {
    user: UserWithNadesAndServers | null
    session: Session
}) {
    let lastNade
    if (!!user?.nades.length) {
        lastNade = user?.nades.reduce((prev, current) => {
            return current.created_at > prev.created_at ? current : prev
        })
    }
    return (
        <section className="min-h-fit">
            <div className="flex flex-wrap justify-start gap-4">
                <UserLastNade url={lastNade?.video_url as string} />
                <UserServers
                    servers={user?.servers_is_member}
                    session={session}
                />
            </div>
        </section>
    )
}
