import { NextPage } from 'next'
import Hero from './components/sections/hero-section'
import SearchSection from './components/sections/search-section'

const Home: NextPage = () => {
    return (
        <>
            <Hero />
            <SearchSection />
        </>
    )
}

export default Home
