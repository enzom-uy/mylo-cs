import Hero from './components/sections/hero-section'
import SearchSection from './components/sections/search-section'

const Home = async ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <>
            <Hero />
            <SearchSection
                query={searchParams.query && (searchParams.query as string)}
            />
        </>
    )
}

export default Home
