import { NextPage } from 'next'
import { Suspense } from 'react'
import Hero from './components/sections/hero-section'
import SearchSection from './components/sections/search-section'

const Home = ({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined }
}) => {
    console.log(searchParams.query)
    return (
        <>
            <Hero />
            <Suspense fallback={<p>Cargando...</p>}>
                <SearchSection
                    query={searchParams.query && (searchParams.query as string)}
                />
            </Suspense>
        </>
    )
}

export default Home
