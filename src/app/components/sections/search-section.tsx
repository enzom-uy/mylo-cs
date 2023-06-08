import { db } from '@/config/db'
import { eq, ilike, like } from 'drizzle-orm'
import React, { Suspense } from 'react'
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
        const queryWithSpaces = query.replaceAll('-', ' ')
        const nades = await db
            .select()
            .from(nade)
            .where(like(nade.title, `%${queryWithSpaces}%`))
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
