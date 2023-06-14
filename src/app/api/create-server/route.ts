import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'
import { server } from '../../../../drizzle/schema'

export interface NewServerData {
    serverName: string
    serverId: string
}

export interface ServerApiResponse {
    status: number
    message: string
}

const errorMessage =
    'Ha ocurrido un error al intentar crear el servidor. Inténtalo nuevamente.'
const successMessage = 'Se ha creado el servidor exitosamente.'

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as NewServerData
        const { serverName, serverId } = body

        await db.insert(server).values({
            name: serverName,
            id: serverId
        })
        return NextResponse.json<ServerApiResponse>({
            status: 200,
            message: successMessage
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json<ServerApiResponse>({
            status: 403,
            message: errorMessage
        })
    }
}
