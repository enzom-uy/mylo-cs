'use client'
import { Bot } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function InviteBot() {
    const t = useTranslations()
    return (
        <a
            className="fake-btn"
            href="https://discord.com/api/oauth2/authorize?client_id=1099023747752673471&permissions=292057901120&scope=bot"
            target="_blank"
            rel="noreferrer"
        >
            <Bot />
            {t('Hero.invite-bot')}
        </a>
    )
}
