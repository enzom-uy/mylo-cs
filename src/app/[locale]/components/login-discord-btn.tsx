'use client'

import { Button } from '@shad/button'
import { signIn } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { BsDiscord } from 'react-icons/bs'

const LoginDiscordButton = () => {
    const t = useTranslations()
    return (
        <Button
            className="btn bg-accent-light hover:bg-accent-light/90"
            onClick={() => signIn('discord')}
        >
            <BsDiscord className="h-6 w-6" />
            {t('Hero.login')}
        </Button>
    )
}

export default LoginDiscordButton
