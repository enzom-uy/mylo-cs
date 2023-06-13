import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'
import { server } from '../../../../drizzle/schema'

export interface NewServerData {
    serverName: string
    serverId: string
}

export interface CreateServerApiResponse {
    status: number
    message: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as NewServerData
        const { serverName, serverId } = body

        await db.insert(server).values({
            name: serverName,
            id: serverId
        })
        return NextResponse.json<CreateServerApiResponse>({
            status: 200,
            message: `Se ha creado el servidor exitosamente.`
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json<CreateServerApiResponse>({
            status: 403,
            message:
                'Ha ocurrido un error al intentar crear el servidor. Inténtalo nuevamente.'
        })
    }
}
