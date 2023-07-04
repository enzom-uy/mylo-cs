import { NextRequest, NextResponse } from 'next/server'
import { addUserToExistingServers } from '@/utils/addUserToExistingServers'
import { ServerApiResponse } from '../create-server/route'

interface Body {
    id: string
    access_token: string
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as Body
        const { id, access_token } = body

        await addUserToExistingServers({
            providerAccountId: id,
            access_token: access_token
        })
        return NextResponse.json<ServerApiResponse>({
            status: 200,
            message: 'Se agregó al usuario a los servidores existentes.',
            result: 'success'
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json<ServerApiResponse>({
            status: 403,
            message:
                'Ha ocurrido un error al intentar unir al usuario a los servidores. Inténtalo nuevamente.',
            result: 'error'
        })
    }
}
