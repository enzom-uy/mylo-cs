'use client'
import { Input } from '@shad/input'
import { ChangeEvent, FormEvent, FormEventHandler, useState } from 'react'

const SearchInput = () => {
    const [query, setQuery] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        setError('')
    }

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (query === '') setError('Este campo es obligatorio.')
    }
    return (
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
            <Input
                type="text"
                placeholder="Molo Banana a Carro"
                value={query}
                onChange={handleInputOnChange}
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
