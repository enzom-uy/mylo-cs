import { approveNade } from '@/services/approveNade'
import { NadeAuthorNadeType } from '@/services/getServer'
import { ApiResponse } from '@/types/api'
import { NextRequest, NextResponse } from 'next/server'

export interface ApproveNadeData {
    nadeId: string
}

export interface ApproveNadeResponse extends ApiResponse {
    approvedNade: NadeAuthorNadeType | undefined
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as ApproveNadeData
        const { nadeId } = body
        const approvedNade = await approveNade(nadeId)
        return NextResponse.json<ApproveNadeResponse>({
            message: 'Aprobaste la granada.',
            approvedNade: approvedNade,
            result: 'success',
            status: '201'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<ApproveNadeResponse>({
            message: 'Ha ocurrido un error al intentar aprobar la granada.',
            approvedNade: undefined,
            result: 'error',
            status: '404'
        })
    }
}
