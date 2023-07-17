import { db } from '@/config/db'
import { NadeAuthorNadeType } from './getServer'

/**
 * Changes nade.status from 'PENDING' to 'APPROVED'.
 * @param {string} nadeId - ID of the nade.
 * @returns {Promise<NadeAuthorNadeType>}
 */
export const approveNade = async (
    nadeId: string
): Promise<NadeAuthorNadeType> => {
    const approvedNade = await db.nade.update({
        where: {
            id: nadeId
        },
        data: {
            status: 'APPROVED'
        },
        include: {
            author: true,
            nade_type: true
        }
    })
    return approvedNade
}
