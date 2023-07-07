import UserCard from '@/app/components/user-card'
import UserServerDataBadges from '@/app/components/user-server-data-badges'
import { User } from '@prisma/client'

interface Props {
    members: User[]
    userIsAdmin: boolean
    userId: string
}

export default function ServerMembers({ members, userIsAdmin, userId }: Props) {
    return (
        <section>
            <div className="mb-2 flex flex-wrap items-center gap-2">
                <h3 className="m-0 w-fit text-lg font-semibold uppercase">
                    miembros
                </h3>
                <UserServerDataBadges members={members.length} />
            </div>
            <div className="border-y border-border-dark">
                {members.map((m) => (
                    <UserCard
                        key={m.id}
                        user={m}
                        userIsAdmin={userIsAdmin}
                        userSelfId={userId}
                    />
                ))}
            </div>
        </section>
    )
}
