import { Suspense } from 'react'
import SearchInput from '../components/search-input'
import Loading from './loading'

export default function SearchLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <SearchInput />
            <Suspense fallback={<Loading />}>{children}</Suspense>
        </>
    )
}
