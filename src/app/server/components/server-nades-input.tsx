import { NadeAuthorNadeType } from '@/services/getServer'
import { Input } from '@/shad-components/input'
import axios from 'axios'
import { useState } from 'react'

interface Props {
    serverId: string
    userId: string
    getNades: (fetchedNades: NadeAuthorNadeType[]) => void
    isLoading: (loading: boolean) => void
}

export default function ServerNadesInput({
    serverId,
    userId,
    getNades,
    isLoading
}: Props) {
    const [search, setSearch] = useState<string>('')
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
    }
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        isLoading(true)
        e.preventDefault()
        const response = await axios
            .get('/api/get-nades', {
                params: {
                    serverId,
                    query: search,
                    userId
                }
            })
            .then((res) => res.data)
        isLoading(false)
        getNades(response.nades)
    }

    return (
        <form onSubmit={handleFormSubmit}>
            <Input
                onChange={handleSearchChange}
                value={search}
                className="mb-4"
            />
        </form>
    )
}
