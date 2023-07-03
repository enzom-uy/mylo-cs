import { getServerSession } from 'next-auth'
import Hero from './components/sections/hero-section'
import SearchSection from './components/sections/search-section'
import { authOptions } from './api/auth/[...nextauth]/route'
import CreateServerForm from './create-server/components/create-server-form'

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
                <p className="mt-6">
                    Debes iniciar sesión y estar en un servidor para buscar
                    granadas.
                </p>
            )}
        </>
    )
}

export default Home
