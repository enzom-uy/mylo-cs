'use client'

import { Button } from '@/shad-components/button'
import { Bot } from 'lucide-react'

export default function InviteBot() {
    return (
        <a
            className="fake-btn"
            href="https://discord.com/api/oauth2/authorize?client_id=1099023747752673471&permissions=292057901120&scope=bot"
            target="_blank"
            rel="noreferrer"
        >
            <Bot />
            Invitar Bot
        </a>
    )
}
