import { GetNadesApiResponse } from '@/app/api/get-nades/route'
import { loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { NadeAuthorNadeType } from '@/services/getServer'
import { Input } from '@/shad-components/input'
import { useToast } from '@/shad-components/use-toast'
import { TOAST_DURATION } from '@/utils/contants'
import axios from 'axios'
import { useTranslations } from 'next-intl'
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
    const t = useTranslations()
    const [search, setSearch] = useState<string>('')
    const { toast } = useToast()
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
                            .includes(normalizedSearch) ||
                        nade.status.toLowerCase().includes(normalizedSearch)
                )
                dispatch(loadingNades(false))
                getNades(filtered!)
                break
            default:
                dispatch(loadingNades(true))
                const response = (await axios
                    .get('/api/get-nades', {
                        params: {
                            serverId,
                            query: search,
                            userId
                        }
                    })
                    .then((res) => res.data)) as GetNadesApiResponse
                if (response.result === 'error') {
                    dispatch(loadingNades(false))
                    toast({
                        title: t('api/get-nades.error'),
                        duration: TOAST_DURATION
                    })
                    break
                }
                dispatch(loadingNades(false))
                getNades(response.nades!)
                break
        }
    }

    return (
        <form onSubmit={handleFormSubmit} className="w-full lg:max-w-sm">
            <Input
                onChange={handleSearchChange}
                value={search}
                className="mb-4"
            />
        </form>
    )
}
