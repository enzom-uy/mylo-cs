import Loading from '@/app/search/loading'
import { db } from '@/config/db'
import { like, or } from 'drizzle-orm'
import React, { Suspense } from 'react'
import { nade } from '../../../../drizzle/schema'
import SearchInput from '../search-input'
import NadesSection from './nades-section'

interface Props {
    query?: string
}

const SearchSection = async ({ query }: Props) => {
    if (!query) {
        return (
            <section className="flex w-full flex-col gap-6 pt-6">
                <SearchInput />
                <p>Haz una búsqueda para ver las granadas.</p>
            </section>
        )
    }

    const getNades = async () => {
        const queryWithSpaces = `%${query.replaceAll('-', ' ')}%`

        const nades = await db
            .select()
            .from(nade)
            .where(
                or(
                    like(nade.title, queryWithSpaces),
                    like(nade.mapId, queryWithSpaces),
                    like(nade.nadeTypeName, queryWithSpaces),
                    like(nade.authorId, queryWithSpaces)
                )
            )
        return nades
    }
    const foundedNades = await getNades()

    return (
        <section className="flex w-full flex-col gap-6 pt-6">
            <Suspense fallback={<Loading />}>
                <NadesSection nades={foundedNades} />
            </Suspense>
        </section>
    )
}

export default SearchSection
