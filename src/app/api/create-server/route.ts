import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'
import {
    errorMessage,
    serverIdMinLength,
    serverNameMinLength,
    successMessage
} from './utils'

export interface NewServerData {
    serverName: string
    serverId: string
    ownerId: string
}

export interface ServerApiResponse {
    status: 201 | 200 | 403
    message: string
    result: 'error' | 'success'
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as NewServerData
        const { serverName, serverId, ownerId } = body

        if (serverName.length < serverNameMinLength) throw new Error()
        if (serverId.length < serverIdMinLength) throw new Error()

        await db.server.create({
            data: {
                id: serverId,
                name: serverName
            }
        })

        return NextResponse.json<ServerApiResponse>({
            status: 201,
            message: successMessage,
            result: 'success'
        })
    } catch (error) {
        return NextResponse.json<ServerApiResponse>({
            status: 403,
            message: errorMessage,
            result: 'error'
        })
    }
}
