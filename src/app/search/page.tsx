import SearchSection from '../components/sections/search-section'

const Home = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    return (
        <>
            <SearchSection
                query={searchParams.query && (searchParams.query as string)}
            />
        </>
    )
}

export default Home
