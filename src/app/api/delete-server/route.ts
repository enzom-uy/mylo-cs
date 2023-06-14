import { NextRequest, NextResponse } from 'next/server'
import { NewServerData, ServerApiResponse } from '../create-server/route'
import { db } from '@/config/db'
import { server } from '../../../../drizzle/schema'
import { eq } from 'drizzle-orm'

export async function POST(req: NextRequest) {
    try {
        console.log('Hola soy el delete server')
        const body = (await req.json()) as NewServerData
        const { serverName, serverId } = body
        console.log(body)

        await db.delete(server).where(eq(server.name, serverName))

        return NextResponse.json<ServerApiResponse>({
            status: 200,
            message: 'Se ha borrado el servidor exitosamente.'
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json<ServerApiResponse>({
            status: 403,
            message:
                'Ha ocurrido un error al intentar borrar el servidor. Inténtalo nuevamente.'
        })
    }
}
