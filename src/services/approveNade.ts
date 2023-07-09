import { db } from '@/config/db'

export const approveNade = async (nadeId: string) => {
    const approvedNade = await db.nade.update({
        where: {
            id: nadeId
        },
        data: {
            status: 'APPROVED'
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
    return approvedNade
}
