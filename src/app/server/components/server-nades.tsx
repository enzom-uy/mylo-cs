'use client'

import NadeCard from '@/app/components/nade-card'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Input } from '@/shad-components/input'
import { useEffect, useState } from 'react'

interface Props {
    nades: NadeAuthorNadeType[]
}

export default function ServerNades({ nades }: Props) {
    const [search, setSearch] = useState<string>('')
    const [filteredNades, setFilteredNades] =
        useState<NadeAuthorNadeType[]>(nades)
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)

        const normalizedSearch = search.trim().toLowerCase()
        const filtered = filteredNades.filter(
            (nade) =>
                nade.title.toLowerCase().includes(normalizedSearch) ||
                nade.author.name.toLowerCase().includes(normalizedSearch) ||
                nade.map_name.toLowerCase().includes(normalizedSearch) ||
                nade.nade_type.name.toLowerCase().includes(normalizedSearch)
        )
        setFilteredNades(search === '' ? nades : filtered)
    }
    useEffect(() => {
        if (search === '') setFilteredNades(nades)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search])

    return (
        <div className="flex w-full flex-col gap-2">
            <div>
                <h2 className="text-lg font-semibold uppercase">granadas</h2>
                <Input
                    onChange={handleSearchChange}
                    value={search}
                    className="mb-4"
                />
            </div>
            <div className="flex w-full flex-wrap justify-center gap-2">
                {filteredNades.map((nade) => (
                    <div
                        key={nade.id}
                        className="flex w-full max-w-xs justify-start"
                    >
                        <NadeCard nade={nade} key={nade.id} />
                    </div>
                ))}
            </div>
        </div>
    )
}
