import { getNadesQuery } from '@/services/getNadesQuery'
import SearchInput from '../search-input'
import NadesSection from './nades-section'

interface Props {
    query?: string
    userId: string
}

const SearchSection = async ({ query, userId }: Props) => {
    const foundedNades = await getNadesQuery({ query, userId })

    return (
        <section className="flex w-full flex-col items-center gap-6 pt-6">
            <SearchInput />
            {!query && <p>Haz una búsqueda para ver las granadas.</p>}
            {query && <NadesSection nades={foundedNades} />}
        </section>
    )
}

export default SearchSection
