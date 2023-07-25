import { db } from '@/config/db'
import { ApiResponse } from '@/types/api'
import { Report_Target } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export interface ReportBody {
    reason: string
    target: Report_Target
    reportedServerId?: string
    reportedNadeId?: string
    reportAuthorId: string
}

export async function POST(req: NextRequest) {
    try {
        const {
            reason,
            target,
            reportAuthorId,
            reportedNadeId,
            reportedServerId
        } = (await req.json()) as ReportBody
        const report = await db.report.create({
            data: {
                reason,
                target,
                author: {
                    connect: {
                        id: reportAuthorId
                    }
                },
                reported_nade:
                    target === 'NADE'
                        ? {
                              connect: {
                                  id: reportedNadeId
                              }
                          }
                        : undefined,
                reported_server:
                    target === 'SERVER'
                        ? {
                              connect: {
                                  id: reportedServerId
                              }
                          }
                        : undefined
            }
        })

        return NextResponse.json<ApiResponse>({
            result: 'success',
            status: '200',
            message: 'Report created.'
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json<ApiResponse>({
            result: 'error',
            status: '404',
            message: 'An error ocurred when tried to create the report.'
        })
    }
}
