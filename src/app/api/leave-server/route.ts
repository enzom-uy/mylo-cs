import { db } from '@/config/db'
import { UserServerId } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

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

        return NextResponse.json({
            message: 'Dejaste el servidor.'
        })
    } catch (error) {
        console.error(error)
    }
}
