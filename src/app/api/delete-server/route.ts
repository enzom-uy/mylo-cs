import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'
import { ServerApiResponse } from '../create-server/route'

export interface DeleteServerReqBody {
    serverId: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as DeleteServerReqBody
        const { serverId } = body

        await db.server.delete({
            where: {
                id: serverId
            }
        })

        return NextResponse.json<ServerApiResponse>({
            status: '200',
            message: 'Se ha borrado el servidor exitosamente.',
            result: 'success'
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json<ServerApiResponse>({
            status: '403',
            message:
                'Ha ocurrido un error al intentar borrar el servidor. Inténtalo nuevamente.',
            result: 'error'
        })
    }
}
