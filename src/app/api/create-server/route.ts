import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'
import { server } from '../../../../drizzle/schema'
import {
    errorMessage,
    serverIdMinLength,
    serverNameMinLength,
    successMessage
} from './utils'
import { createServerSchema } from '@/app/create-server/components/create-server-form'
import * as z from 'zod'

export interface NewServerData {
    serverName: string
    serverId: string
}

export interface ServerApiResponse {
    status: number
    message: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as NewServerData
        const { serverName, serverId } = body
        console.log(
            `El nombre ${serverName} tiene ${serverName.length} cantidad de letras.`
        )

        if (serverName.length < serverNameMinLength) throw new Error()
        if (serverId.length < serverIdMinLength) throw new Error()

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
