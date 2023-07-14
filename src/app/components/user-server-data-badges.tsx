'use client'

import NadeIconSvg from '@/app/components/nade-icon-svg'
import { useAppSelector } from '@/redux/hooks'
import { Badge } from '@/shad-components/badge'
import { Server, Users } from 'lucide-react'

export default function UserServerDataBadges({
    members,
    nades,
    servers
}: {
    members?: number
    nades?: number
    servers?: number
}) {
    const reduxMembers = useAppSelector((state) => state.membersReducer.members)
    const formattedNumber = (number: number) => (number > 900 ? '+900' : number)
    return (
        <div className="flex items-center gap-2">
            {members !== undefined && (
                <Badge className="server-badge">
                    <Users className="w-4" />
                    {formattedNumber(
                        !!reduxMembers.length ? reduxMembers.length : members
                    )}
                </Badge>
            )}
            {nades !== undefined && (
                <Badge className="server-badge">
                    <NadeIconSvg className="w-4" />
                    {nades}
                </Badge>
            )}
            {servers !== undefined && (
                <Badge className="server-badge">
                    <Server className="w-4" />
                    {formattedNumber(servers)}
                </Badge>
            )}
        </div>
    )
}
