import { deleteNade } from '@/services/deleteNade'
import { ApiResponse } from '@/types/api'
import { Nade } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export interface DeleteNadeData {
    nadeId: string
}

export interface DeleteNadeApiResponse extends ApiResponse {
    deletedNade: Nade | undefined
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as DeleteNadeData
        const { nadeId } = body
        const deletedNade = await deleteNade(nadeId)
        return NextResponse.json<DeleteNadeApiResponse>({
            message: 'Eliminaste la granada.',
            deletedNade: deletedNade,
            result: 'success',
            status: '200'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<DeleteNadeApiResponse>({
            deletedNade: undefined,
            message: 'Ha ocurrido un error al intentar eliminar la granada.',
            result: 'error',
            status: '404'
        })
    }
}
