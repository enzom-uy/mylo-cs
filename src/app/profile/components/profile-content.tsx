import { UserWithNadesAndServers } from '@/utils/getUser'
import UserLastNade from './user-last-nade'
import UserServers from './user-servers'

export default function ProfileContent({
    user
}: {
    user: UserWithNadesAndServers | null
}) {
    let lastNade
    if (!!user?.nades.length) {
        lastNade = user?.nades.reduce((prev, current) => {
            return current.created_at > prev.created_at ? current : prev
        })
    }
    return (
        <section>
            <div className="flex max-h-72 gap-2">
                <UserLastNade url={lastNade?.video_url as string} />
                <UserServers servers={user?.servers_is_member} />
            </div>
        </section>
    )
}
