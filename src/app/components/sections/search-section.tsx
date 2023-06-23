import { db } from '@/config/db'
import React from 'react'
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
        const nades = await db.nade.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: queryWithSpaces
                        }
                    },
                    {
                        nade_type_name: {
                            contains: queryWithSpaces
                        }
                    },
                    {
                        author: {
                            name: {
                                contains: queryWithSpaces
                            }
                        }
                    },
                    {
                        map_name: {
                            contains: queryWithSpaces
                        }
                    }
                ]
            },
            include: {
                author: {
                    select: {
                        name: true
                    }
                },
                map: {
                    select: {
                        name: true
                    }
                }
            }
        })
        console.log(nades)
        return nades
    }
    const foundedNades = await getNades()

    return (
        <section className="flex w-full flex-col gap-6 pt-6">
            <SearchInput />
            <NadesSection nades={foundedNades} />
        </section>
    )
}

export default SearchSection
