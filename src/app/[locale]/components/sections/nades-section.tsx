'use client'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useTranslations } from 'next-intl'
import NadeCard from '@/app/[locale]/components/nade/nade-card'
import NadeSkeleton from '../nade-skeleton'
import { useNadesSection } from './hooks/useNadesSection'

interface Props {
    nades: NadeAuthorNadeType[]
}

const NadesSection: React.FC<Props> = ({ nades }) => {
    const t = useTranslations()
    const { state, reduxIsLoading } = useNadesSection({ nades })
    const { loading } = state
    return (
        <section
            className={`flex w-full flex-wrap justify-center gap-4 lg:justify-start ${
                nades.length === 0 && 'lg:justify-center'
            }`}
        >
            {reduxIsLoading ? (
                <NadeSkeleton />
            ) : !nades ? (
                <p>{t('Nades-Section.do-query-to-search')}</p>
            ) : !loading && nades.length <= 0 ? (
                <p>{t('Nades-Section.no-nades')}</p>
            ) : (
                nades.map((nade) => <NadeCard key={nade.id} nade={nade} />)
            )}
        </section>
    )
}

export default NadesSection
