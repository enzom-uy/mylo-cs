import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
    try {
        const maps = await db.map.findMany()
        return NextResponse.json(maps)
    } catch (error) {
        console.error(error)
    }
}
