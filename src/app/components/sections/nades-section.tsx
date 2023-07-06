'use client'
import { useEffect, useState } from 'react'
import NadeCard from '../nade-card'
import { Nade } from '@prisma/client'

export interface NadeWithAuthorAndMap extends Nade {
    author: {
        name: string
    }
    map: {
        name: string
    }
}

interface Props {
    nades: NadeWithAuthorAndMap[]
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
        <section className="flex w-full flex-wrap justify-center gap-4">
            {!nades ? (
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
