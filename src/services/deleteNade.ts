import { db } from '@/config/db'
import { Nade } from '@prisma/client'

/**
 * Deletes a nade from the database.
 * @param {string} nadeId - ID of the nade.
 * @returns {Promise<Nade>}
 */
export const deleteNade = async (nadeId: string): Promise<Nade> => {
    const deletedNade = await db.nade.delete({
        where: {
            id: nadeId
        }
    })
    return deletedNade
}
