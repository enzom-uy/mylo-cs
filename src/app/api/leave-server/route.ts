import { db } from '@/config/db'
import { UserServerId } from '@/types'
import { ApiResponse } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'
import { ServerApiResponse } from '../create-server/route'

export interface LeaveServerReqBody extends UserServerId {}

export async function POST(req: NextRequest) {
    try {
        const { serverId, userId } = (await req.json()) as LeaveServerReqBody

        await db.user.update({
            where: {
                id: userId
            },
            data: {
                servers_is_member: {
                    disconnect: {
                        id: serverId
                    }
                },
                servers_is_admin: {
                    disconnect: {
                        id: serverId
                    }
                }
            }
        })

        return NextResponse.json<ApiResponse>({
            message: 'Dejaste el servidor.',
            result: 'success',
            status: '200'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<ApiResponse>({
            message: 'Ha ocurrido un error al intentar dejar el servidor.',
            result: 'error',
            status: '404'
        })
    }
}
