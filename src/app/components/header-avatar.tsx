'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import React from 'react'

interface Props {
    image: string | undefined
    fallback: string
}

const HeaderAvatar: React.FC<Props> = ({ image, fallback }) => {
    return (
        <Avatar className="h-8 w-8 cursor-pointer">
            <AvatarImage src={image} className="rounded-full" />
            <AvatarFallback className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-dark-secondary">
                {fallback}
            </AvatarFallback>
        </Avatar>
    )
}

export default HeaderAvatar
