'use client'
import { NadeAuthorNadeType } from '@/services/getServer'
import NadeCard from '../nade-card'
import NadeSkeleton from '../nade-skeleton'
import { useNadesSection } from './hooks/useNadesSection'

interface Props {
    nades: NadeAuthorNadeType[]
}

const NadesSection: React.FC<Props> = ({ nades }) => {
    const { state, reduxIsLoading } = useNadesSection({ nades })
    const { loading } = state
    return (
        <section className="flex w-full flex-wrap justify-center gap-4 lg:justify-start">
            {reduxIsLoading ? (
                <NadeSkeleton />
            ) : !nades ? (
                <p>Haz una búsqueda para ver las granadas.</p>
            ) : !loading && nades.length <= 0 ? (
                <p>No se encontraron granadas.</p>
            ) : (
                nades.map((nade) => <NadeCard key={nade.id} nade={nade} />)
            )}
        </section>
    )
}

export default NadesSection
