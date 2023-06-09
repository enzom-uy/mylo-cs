'use client'
import { Input } from '@shad/input'
import { useRouter } from 'next/navigation'
import { ChangeEvent, FormEvent, useState } from 'react'

const SearchInput = () => {
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
        if (query === '') {
            setError('Este campo es obligatorio.')
            return
        }
        const formattedQuery = query.replaceAll(' ', '-')
        router.push(`/search?query=${formattedQuery}`)
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
