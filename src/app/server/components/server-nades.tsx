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
    }, [search])
    console.log(search)
    return (
        <div className="flex w-full max-w-sm flex-col justify-center">
            <h2 className="text-lg font-semibold uppercase">granadas</h2>
            <Input
                onChange={handleSearchChange}
                value={search}
                className="mb-4"
            />
            <div className=" flex flex-col gap-4">
                {filteredNades.map((nade) => (
                    <NadeCard nade={nade} key={nade.id} />
                ))}
            </div>
        </div>
    )
}
