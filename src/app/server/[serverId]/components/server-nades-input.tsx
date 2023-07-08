import { loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Input } from '@/shad-components/input'
import axios from 'axios'
import { useState } from 'react'

interface Props {
    serverId: string
    userId: string
    getNades: (fetchedNades: NadeAuthorNadeType[]) => void
    isAdmin?: boolean
    nades?: NadeAuthorNadeType[]
}

export default function ServerNadesInput({
    serverId,
    userId,
    getNades,
    isAdmin,
    nades
}: Props) {
    const [search, setSearch] = useState<string>('')
    const dispatch = useAppDispatch()
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
    }
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loadingNades(true))
        switch (isAdmin) {
            case true:
                dispatch(loadingNades(true))
                const normalizedSearch = search.trim().toLowerCase()
                const filtered = nades?.filter(
                    (nade) =>
                        nade.title.toLowerCase().includes(normalizedSearch) ||
                        nade.author.name
                            .toLowerCase()
                            .includes(normalizedSearch) ||
                        nade.map_name
                            .toLowerCase()
                            .includes(normalizedSearch) ||
                        nade.nade_type.name
                            .toLowerCase()
                            .includes(normalizedSearch)
                )
                dispatch(loadingNades(false))
                getNades(filtered!)
                break
            default:
                dispatch(loadingNades(true))
                console.log('poidiendo nades...')
                const response = await axios
                    .get('/api/get-nades', {
                        params: {
                            serverId,
                            query: search,
                            userId
                        }
                    })
                    .then((res) => res.data)
                console.log(response)
                dispatch(loadingNades(false))
                getNades(response.nades)
                break
        }
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
