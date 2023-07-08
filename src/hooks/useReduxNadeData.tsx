import { loadNades, loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useEffect } from 'react'

interface Props {
    isAdmin?: boolean
    nades: NadeAuthorNadeType[]
}

export const useNadesData = ({ isAdmin, nades }: Props) => {
    const reduxIsLoading = useAppSelector((state) => state.nadesReducer.loading)
    const reduxNades = useAppSelector((state) => state.nadesReducer.nades)
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (isAdmin) {
            dispatch(loadNades(nades))
        }
        dispatch(loadingNades(false))
    }, [])

    return { reduxIsLoading, reduxNades }
}
