'use client'
import { NadeAuthorNadeType } from '@/services/getServer'
import { useTranslations } from 'next-intl'
import NadeCard from '@/app/[locale]/components/nade/nade-card'
import NadeSkeleton from '../nade-skeleton'
import { useNadesSection } from './hooks/useNadesSection'

interface Props {
    nades: NadeAuthorNadeType[]
    userId: string
}

const NadesSection: React.FC<Props> = ({ nades, userId }) => {
    const t = useTranslations()
    const { state, reduxIsLoading } = useNadesSection({ nades })
    const { loading } = state
    return (
        <section
            className={`flex w-full max-w-5xl flex-wrap justify-center gap-4 lg:justify-start ${
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
                nades.map((nade) => (
                    <NadeCard key={nade.id} nade={nade} userId={userId} />
                ))
            )}
        </section>
    )
}

export default NadesSection
