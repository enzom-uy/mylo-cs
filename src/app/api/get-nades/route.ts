import { getNadesQuery } from '@/services/getNadesQuery'
import { NadeAuthorNadeType } from '@/services/getServer'
import { ApiResponse } from '@/types/api'
import { Map, Nade } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export interface NadeAuthorNadeTypeMap extends NadeAuthorNadeType {
    map: Map
}

export interface GetNadesApiResponse extends ApiResponse {
    nades: NadeAuthorNadeTypeMap[] | undefined
}

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams
        const serverId = params.get('serverId')
        const userId = params.get('userId') as string
        const query = params.get('query') as string
        const nades = await getNadesQuery({
            userId: userId,
            serverId: serverId ? serverId : undefined,
            query
        })
        return NextResponse.json<GetNadesApiResponse>({
            nades: nades,
            message: 'Granadas obtenidas.',
            status: '200',
            result: 'success'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<GetNadesApiResponse>({
            nades: undefined,
            message: 'Ha ocurrido un error al intentar obtener las granadas.',
            status: '404',
            result: 'error'
        })
    }
}
