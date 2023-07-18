'use client'
import { loadingNades } from '@/redux/features/nadesSlice'
import { useAppDispatch } from '@/redux/hooks'
import { Input } from '@shad/input'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const SearchInput = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery('')
        setQuery(e.target.value)
        setError('')
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const url = window.location.href
        if (url.includes(query)) return dispatch(loadingNades(false))
        if (query === '') {
            setError('Este campo es obligatorio.')
            return
        }
        dispatch(loadingNades(true))
        const formattedQuery = query.replaceAll(' ', '-')
        router.push(`/?query=${formattedQuery}`)
    }

    return (
        <form
            onSubmit={handleFormSubmit}
            className="flex w-full max-w-xl flex-col gap-2"
        >
            <Input
                type="text"
                placeholder="Molo Banana a Carro"
                value={query}
                onChange={handleInputOnChange}
                className="w-full border-border-dark"
            />
            {error !== '' && (
                <p className="flex items-center gap-1 text-sm">
                    <span className="text-red-500">*</span>
                    {error}
                </p>
            )}
        </form>
    )
}

export default SearchInput
