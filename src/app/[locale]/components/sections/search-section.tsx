import { getNadesQuery } from '@/services/getNadesQuery'
import { useTranslations } from 'next-intl'
import SearchInput from '../search-input'
import NadesSection from './nades-section'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

interface Props {
    query?: string
}

const SearchMsg = () => {
    const t = useTranslations()
    return <p>{t('Search-Section.search-msg')}</p>
}

const MustLoginMsg = () => {
    const t = useTranslations()
    return <p className="mt-6">{t('Search-Section.must-login')}</p>
}

const SearchSection = async ({ query }: Props) => {
    const session = await getServerSession(authOptions)
    const foundedNades = await getNadesQuery({
        query,
        userId: session?.id as string
    })
    console.log(session && !!!query)

    return (
        <section className="flex w-full flex-col items-center gap-6 pt-6">
            {session && query ? (
                <SearchInput />
            ) : !session ? (
                <MustLoginMsg />
            ) : (
                session &&
                !!!query && (
                    <>
                        <SearchInput /> <SearchMsg />
                    </>
                )
            )}
            {query && (
                <NadesSection
                    nades={foundedNades}
                    userId={session?.id as string}
                />
            )}
        </section>
    )
}

export default SearchSection
