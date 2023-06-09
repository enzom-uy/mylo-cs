import { db } from '@/config/db'
import { like, or } from 'drizzle-orm'
import React from 'react'
import { nade } from '../../../../drizzle/schema'
import SearchInput from '../search-input'
import NadesSection from './nades-section'

interface Props {
    query?: string
}

const SearchSection: any = async ({ query }: Props) => {
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
                    like(nade.nadeTypeName, queryWithSpaces)
                )
            )
        return nades
    }
    const foundedNades = await getNades()

    console.log('Rerender')
    return (
        <section className="flex w-full flex-col gap-6 pt-6">
            <SearchInput />
            <NadesSection nades={foundedNades} />
        </section>
    )
}

export default SearchSection
