import { db } from '@/config/db'
import { ApiResponse } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'

export interface ChangeUserRoleReqBody {
    userId: string
    serverId: string
    newRole: 'admin' | 'member'
}

export async function POST(req: NextRequest) {
    try {
        const { newRole, serverId, userId } =
            (await req.json()) as ChangeUserRoleReqBody
        if (newRole === 'admin') {
            const updatedUser = await db.server.update({
                where: {
                    id: serverId
                },
                data: {
                    admins: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
        }
        if (newRole === 'member') {
            const updatedUser = await db.server.update({
                where: {
                    id: serverId
                },
                data: {
                    admins: {
                        disconnect: {
                            id: userId
                        }
                    },
                    members: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
        }

        return NextResponse.json<ApiResponse>({
            message: 'Se actualizó el rol del usuario.',
            result: 'success',
            status: '200'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<ApiResponse>({
            message:
                'Ha ocurrido un error al intentar actualizar el rol del usuario.',
            result: 'error',
            status: '404'
        })
    }
}
