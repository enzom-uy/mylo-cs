'use client'

import { Button } from '@shad/button'
import { BsDiscord } from 'react-icons/bs'
import { signIn } from 'next-auth/react'

const LoginDiscordButton = () => {
    return (
        <Button
            className="flex w-min items-center gap-2 bg-dark-secondary text-sm"
            onClick={() => signIn('discord')}
        >
            <BsDiscord className="h-6 w-6" />
            Entrar
        </Button>
    )
}

export default LoginDiscordButton
