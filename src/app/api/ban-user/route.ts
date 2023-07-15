import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'

export interface BanUserReqBody {
    bannedUserId: string
    serverId: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as BanUserReqBody
        const { serverId, bannedUserId } = body
        const userServerRole = await db.userServerRole.findFirst({
            where: {
                server_id: serverId,
                user_id: bannedUserId
            }
        })

        await db.server.update({
            where: {
                id: serverId
            },
            data: {
                members: {
                    disconnect: {
                        id: bannedUserId
                    }
                },
                banned_users: {
                    connect: {
                        id: bannedUserId
                    }
                },
                UserServerRole: {
                    delete: {
                        id: userServerRole?.id
                    }
                }
            }
        })

        return NextResponse.json({
            message: 'Se baneó al usuario exitosamente.'
        })
    } catch (error) {
        console.error(error)
    }
}
