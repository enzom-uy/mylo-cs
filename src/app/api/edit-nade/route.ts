import { EditNadeSchemaType } from '@/app/[locale]/server/[serverId]/admin/components/admin-controls-edit'
import { db } from '@/config/db'
import { ApiResponse } from '@/types/api'
import { Nade } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export interface EditNadeData extends EditNadeSchemaType {
    nadeId: string
}

export interface EditNadeApiResponse extends ApiResponse {
    updatedNade: Nade | undefined
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as EditNadeData
        const { map, nadeType, title, description, nadeId } = body
        console.log(body)

        const updatedNade = await db.nade.update({
            where: {
                id: nadeId
            },
            data: {
                map: {
                    connect: {
                        name: map
                    }
                },
                nade_type: {
                    connect: {
                        name: nadeType
                    }
                },
                title: title,
                description: description ? description : null
            },
            include: {
                author: true,
                nade_type: true
            }
        })

        return NextResponse.json<EditNadeApiResponse>({
            message: 'Se ha editado la granada correctamente.',
            result: 'success',
            status: '200',
            updatedNade
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<EditNadeApiResponse>({
            message: 'Ha ocurrido un error al intentar editar la granada.',
            result: 'error',
            status: '404',
            updatedNade: undefined
        })
    }
}
