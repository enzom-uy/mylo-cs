import { db } from '@/config/db'
import { ApiResponse } from '@/types/api'
import { User } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export interface UnbanUserReqBody {
    bannedUserId: string
    serverId: string
}

export interface UnbanUserApiResponse extends ApiResponse {
    unbannedUser: User | undefined
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as UnbanUserReqBody
        const { bannedUserId, serverId } = body
        const unbannedUser = await db.server.update({
            where: {
                id: serverId
            },
            data: {
                banned_users: {
                    disconnect: {
                        id: bannedUserId
                    }
                },
                members: {
                    connect: {
                        id: bannedUserId
                    }
                }
            },
            select: {
                members: {
                    where: {
                        id: bannedUserId
                    }
                }
            }
        })
        const user = unbannedUser.members[0]
        return NextResponse.json<UnbanUserApiResponse>({
            message: 'Se desbaneó al usuario.',
            unbannedUser: user,
            result: 'success',
            status: '200'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<UnbanUserApiResponse>({
            message: 'Ha ocurrido un error al intentar desbanear el usuario.',
            unbannedUser: undefined,
            result: 'error',
            status: '404'
        })
    }
}
