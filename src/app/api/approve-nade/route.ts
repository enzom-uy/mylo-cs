import { approveNade } from '@/services/approveNade'
import { NadeAuthorNadeType } from '@/services/getServer'
import { NextRequest, NextResponse } from 'next/server'

export interface ApproveNadeData {
    nadeId: string
}

export interface ApproveNadeResponse {
    message: string
    approvedNade: NadeAuthorNadeType
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as ApproveNadeData
        const { nadeId } = body
        const approvedNade = await approveNade(nadeId)
        return NextResponse.json<ApproveNadeResponse>({
            message: 'Aprobaste la granada.',
            approvedNade: approvedNade
        })
    } catch (error) {
        console.error(error)
    }
}
