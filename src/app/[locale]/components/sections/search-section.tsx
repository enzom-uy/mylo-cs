import { getNadesQuery } from '@/services/getNadesQuery'
import { useTranslations } from 'next-intl'
import SearchInput from '../search-input'
import NadesSection from './nades-section'

interface Props {
    query?: string
    userId: string
}

const Msg = () => {
    const t = useTranslations()
    return <p>{t('Search-Section.search-msg')}</p>
}

const SearchSection = async ({ query, userId }: Props) => {
    const foundedNades = await getNadesQuery({ query, userId })

    return (
        <section className="flex w-full flex-col items-center gap-6 pt-6">
            <SearchInput />
            {!query && <Msg />}
            {query && <NadesSection nades={foundedNades} userId={userId} />}
        </section>
    )
}

export default SearchSection
