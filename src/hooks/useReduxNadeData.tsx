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
            console.log('Loading...')
            dispatch(loadNades(nades))
            console.log('Finish loading')
            dispatch(loadingNades(false))
        }
    }, [])

    return { reduxIsLoading, reduxNades }
}
