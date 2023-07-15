import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'

export interface UnbanUserReqBody {
    bannedUserId: string
    serverId: string
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
                },
                UserServerRole: {
                    create: {
                        role: 'USER',
                        user: {
                            connect: {
                                id: bannedUserId
                            }
                        }
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
        return NextResponse.json({
            message: 'Se desbaneó al usuario.',
            unbannedUser
        })
    } catch (error) {
        console.error(error)
    }
}
