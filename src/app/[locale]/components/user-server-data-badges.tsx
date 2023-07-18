'use client'

import NadeIconSvg from '@/app/[locale]/components/nade-icon-svg'
import { useAppSelector } from '@/redux/hooks'
import { Badge } from '@/shad-components/badge'
import { Server, Users } from 'lucide-react'

export default function UserServerDataBadges({
    members,
    nades,
    servers,
    isBannedMembers
}: {
    members?: number
    nades?: number
    servers?: number
    isBannedMembers?: boolean
}) {
    const reduxMembers = useAppSelector((state) => state.membersReducer.members)
    const reduxBannedMembers = useAppSelector(
        (state) => state.membersReducer.bannedMembers
    )
    const formattedNumber = (number: number) => (number > 900 ? '+900' : number)
    return (
        <div className="flex items-center gap-2">
            {members !== undefined && (
                <Badge className="server-badge">
                    <Users className="w-4" />
                    {formattedNumber(
                        isBannedMembers
                            ? !!reduxBannedMembers.length
                                ? reduxBannedMembers.length
                                : members
                            : !!reduxMembers.length
                            ? reduxMembers.length
                            : members
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
