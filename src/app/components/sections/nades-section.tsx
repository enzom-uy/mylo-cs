'use client'
import { Nade } from '@/types/db'
import { useEffect, useState } from 'react'
import NadeCard from '../nade-card'
import NadeCardSkeleton from '../nade-card-skeleton'

interface Props {
    nades: Nade[]
}

const NadesSection: React.FC<Props> = ({ nades }) => {
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
        } else {
            setState((prevState) => ({
                ...prevState,
                loading: false,
                error: 'No se encontraron granadas.'
            }))
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
        <section className="flex w-full flex-col gap-4">
            {state.loading && <NadeCardSkeleton />}
            {!state.loading && nades.length <= 0 ? (
                <p>No se encontraron granadas.</p>
            ) : (
                nades.map((nade) => <NadeCard key={nade.id} nade={nade} />)
            )}
        </section>
    )
}

export default NadesSection
