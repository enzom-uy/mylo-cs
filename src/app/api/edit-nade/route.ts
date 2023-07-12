import { EditNadeSchemaType } from '@/app/server/[serverId]/admin/components/admin-controls-edit'
import { db } from '@/config/db'
import { NextRequest, NextResponse } from 'next/server'

export interface EditNadeData extends EditNadeSchemaType {
    nadeId: string
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
                author: {
                    select: {
                        name: true
                    }
                },
                nade_type: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return NextResponse.json(updatedNade)
    } catch (error) {
        console.error(error)
    }
}
