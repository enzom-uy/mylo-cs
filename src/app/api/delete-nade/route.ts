import { deleteNade } from '@/services/deleteNade'
import { NextRequest, NextResponse } from 'next/server'

export interface DeleteNadeData {
    nadeId: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as DeleteNadeData
        const { nadeId } = body
        const deletedNade = await deleteNade(nadeId)
        return NextResponse.json({
            message: 'Eliminaste la granada.',
            deletedNade: deletedNade
        })
    } catch (error) {
        console.error(error)
    }
}
