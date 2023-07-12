import { getNadesQuery } from '@/services/getNadesQuery'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

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
        return NextResponse.json({ nades: nades })
    } catch (error) {
        console.error(error)
    }
}
