import { db } from '@/config/db'

export const deleteNade = async (nadeId: string) => {
    const deletedNade = await db.nade.delete({
        where: {
            id: nadeId
        }
    })
    return deletedNade
}
