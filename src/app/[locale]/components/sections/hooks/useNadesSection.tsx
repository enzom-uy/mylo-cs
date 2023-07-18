import { loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useEffect, useState } from 'react'

interface Props {
    nades: NadeAuthorNadeType[]
}

export const useNadesSection = ({ nades }: Props) => {
    const reduxIsLoading = useAppSelector((state) => state.nadesReducer.loading)
    console.log('Redux is loading: ', reduxIsLoading)
    const dispatch = useAppDispatch()
    const [state, setState] = useState({
        loading: true
    })

    useEffect(() => {
        if (nades.length > 0) {
            setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            dispatch(loadingNades(false))
        } else {
            setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            dispatch(loadingNades(false))
        }

        dispatch(loadingNades(false))
        return () => {
            setState((prevState) => ({
                ...prevState,
                loading: true
            }))

            dispatch(loadingNades(false))
        }
    }, [nades])

    return {
        state,
        reduxIsLoading
    }
}
