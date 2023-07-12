import { NadeAuthorNadeType } from '@/services/getServer'

export const sortNadesPendingFirst = (nades: NadeAuthorNadeType[]) => {
    return nades.sort((a, b) => {
        if (a.status === 'PENDING' && b.status !== 'PENDING') {
            return -1
        }
        if (a.status !== 'PENDING' && b.status === 'PENDING') {
            return 1
        }
        return 0
    })
}
