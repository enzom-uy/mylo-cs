'use client'
import { useEffect, useState } from 'react'
import NadeCard from '../nade-card'
import { Nade } from '@prisma/client'

export interface NadeWithAuthorAndNadeType extends Nade {
    author_id: string
    nadeTypeName: string
}

interface Props {
    nades: NadeWithAuthorAndNadeType[]
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
            {!state.loading && nades.length <= 0 ? (
                <p>No se encontraron granadas.</p>
            ) : (
                nades.map((nade) => <NadeCard key={nade.id} nade={nade} />)
            )}
        </section>
    )
}

export default NadesSection
