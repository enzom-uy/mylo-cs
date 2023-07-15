'use client'
import { loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Nade } from '@prisma/client'
import { useEffect, useState } from 'react'
import Loader from '../loader'
import NadeCard from '../nade-card'

interface Props {
    nades: NadeAuthorNadeType[]
}

const NadesSection: React.FC<Props> = ({ nades }) => {
    const reduxIsLoading = useAppSelector((state) => state.nadesReducer.loading)
    const dispatch = useAppDispatch()
    const [state, setState] = useState({
        loading: true,
        error: ''
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
                loading: false,
                error: 'No se encontraron granadas.'
            }))
            dispatch(loadingNades(false))
        }
        return () => {
            setState((prevState) => ({
                ...prevState,
                loading: true,
                error: ''
            }))
        }
    }, [nades])
    return (
        <section className="flex w-full flex-wrap justify-center gap-4">
            {reduxIsLoading ? (
                <Loader />
            ) : !nades ? (
                <p>Haz una búsqueda para ver las granadas.</p>
            ) : !state.loading && nades.length <= 0 ? (
                <p>No se encontraron granadas.</p>
            ) : (
                nades.map((nade) => <NadeCard key={nade.id} nade={nade} />)
            )}
        </section>
    )
}

export default NadesSection
