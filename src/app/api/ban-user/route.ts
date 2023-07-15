import { db } from '@/config/db'
import { ApiResponse } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'

export interface BanUserReqBody {
    bannedUserId: string
    serverId: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as BanUserReqBody
        const { serverId, bannedUserId } = body

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
                admins: {
                    disconnect: {
                        id: bannedUserId
                    }
                },
                banned_users: {
                    connect: {
                        id: bannedUserId
                    }
                }
            }
        })

        return NextResponse.json<ApiResponse>({
            message: 'Se baneó al usuario exitosamente.',
            result: 'success',
            status: '200'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<ApiResponse>({
            message: 'Ha ocurrido un error al intentar banear al usuario.',
            result: 'error',
            status: '404'
        })
    }
}
