import { getServerSession } from 'next-auth'
import { useTranslations } from 'next-intl'
import { authOptions } from '../api/auth/[...nextauth]/route'
import Hero from './components/sections/hero-section'
import SearchSection from './components/sections/search-section'

const Msg = () => {
    const t = useTranslations()
    return <p className="mt-6">{t('Search-Section.must-login')}</p>
}

const Home = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    const session = await getServerSession(authOptions)
    return (
        <>
            <Hero />
            {session ? (
                <SearchSection
                    query={searchParams.query && (searchParams.query as string)}
                    userId={session?.id}
                />
            ) : (
                <Msg />
            )}
        </>
    )
}

export default Home
